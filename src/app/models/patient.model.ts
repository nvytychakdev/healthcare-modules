import { ModulePrimitive } from '@healthcare/core';

export type Patient = {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  sex: 'Male' | 'Female' | 'Other';
  dateOfBirth: string;
  phoneNumber: string;
  email: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  emergencyContact?: {
    name: string;
    relationship: string;
    phoneNumber: string;
  };
  insurance: {
    provider: string;
    memberId: string;
    plan: string;
  };
  preferredLanguage: string;
  maritalStatus: string;
  notes: string;
  bloodType?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  allergies?: string[];
  conditions?: string[];
  medications?: string[];
  lastVisit?: string;
  nextAppointment?: string;
  insuranceProvider?: string;
  profileImageUrl?: string;
  data: Partial<Record<string, ModulePrimitive>>;
};

export const getRandomBool = () => Boolean(parseInt(Math.random().toFixed()));

export const generatePatient = (index: number): Patient => {
  const firstNames = ['Emily', 'John', 'Sophia', 'Michael', 'Isabella'];
  const lastNames = ['Turner', 'Smith', 'Johnson', 'Williams', 'Brown'];
  const genders = ['Female', 'Male', 'Other'] satisfies Patient['gender'][];
  const bloodTypes = [
    'A+',
    'A-',
    'B+',
    'B-',
    'AB+',
    'AB-',
    'O+',
    'O-',
  ] satisfies Patient['bloodType'][];
  const languages = ['English', 'Spanish', 'French', 'German'];
  const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed'];
  const insuranceProviders = ['BlueCross BlueShield', 'UnitedHealthcare', 'Aetna'];
  const plans = ['Gold Plus', 'Silver Basic', 'Platinum Elite'];

  const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
  const randomAge = Math.floor(Math.random() * 60) + 18;
  const birthDate = new Date();
  birthDate.setFullYear(birthDate.getFullYear() - randomAge);

  const firstName = getRandom(firstNames);
  const lastName = getRandom(lastNames);
  const fullName = `${firstName} ${lastName}`;

  return {
    id: `PAT-${index}`,
    firstName,
    lastName,
    fullName,
    age: 34,
    gender: getRandom(genders),
    sex: getRandom(genders),
    dateOfBirth: '1991-06-15',
    phoneNumber: '+1 (555) 123-4567',
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
    address: {
      street: '123 Oak Street',
      city: 'Springfield',
      state: 'IL',
      zip: '62704',
      country: 'USA',
    },
    insurance: {
      provider: getRandom(insuranceProviders),
      memberId: `${getRandom(['BCBS', 'UHC', 'AET'])}-${Math.floor(100000000 + Math.random() * 900000000)}`,
      plan: getRandom(plans),
    },
    emergencyContact: {
      name: `${getRandom(firstNames)} ${getRandom(lastNames)}`,
      relationship: getRandom(['Spouse', 'Parent', 'Sibling', 'Friend']),
      phoneNumber: `+1 (555) ${Math.floor(100 + Math.random() * 900)}-${Math.floor(1000 + Math.random() * 9000)}`,
    },
    preferredLanguage: getRandom(languages),
    maritalStatus: getRandom(maritalStatuses),
    bloodType: getRandom(bloodTypes),
    notes: Math.random() < 0.5 ? 'Allergic to penicillin' : '',
    data: {
      ['Temperature']: generateModuleData(1, 'Temperature', '1', [36, 45]),
      ['Weight']: generateModuleData(1, 'Weight', '1', [40, 150]),
      ['Symptoms']: generateModuleData(1, 'Symptoms', '1', [36, 45]),
      ['BloodPressure']: generateModuleData(1, 'BloodPressure', '1', [100, 200]),
    },
  };
};

export const generateModuleData = (
  index: number,
  moduleId: string,
  moduleConfigId: string,
  valueRange: number[],
): ModulePrimitive => {
  return {
    id: `${index}`,
    moduleId,
    moduleConfigId,
    createDateTime: generateDate(index),
    updateDateTime: generateDate(index),
    direction: Boolean(parseInt(Math.random().toFixed())) ? 'INCREASE' : 'DECREASE',
    value: parseInt((Math.random() * (valueRange[1] - valueRange[0]) + valueRange[0]).toFixed()),
  };
};

export const generateDate = (index: number) => {
  const date = new Date();
  date.setDate(date.getDate() + index);
  date.setHours(Math.floor(Math.random() * 23));
  date.setMinutes(Math.floor(Math.random() * 59));
  date.setSeconds(Math.floor(Math.random() * 59));
  return date.toISOString();
};

export const PATIENTS: Patient[] = [
  ...Array.from(Array(30))
    .fill(null)
    .map((v, index) => generatePatient(index)),
];
