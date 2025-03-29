import type { ResolveFn } from '@angular/router';
import { Patient, PATIENTS } from '../models/patient.model';

export const patientResolver: ResolveFn<Patient | null> = (route, state) => {
  const patientId = route.paramMap.get('id');
  if (!patientId) return null;

  return PATIENTS.find(({ id }) => String(id) === patientId) || null;
};
