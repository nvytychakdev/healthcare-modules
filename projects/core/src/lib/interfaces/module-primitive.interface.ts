export interface ModulePrimitive {
  id: string;
  createDateTime: string;
  updateDateTime: string;
  moduleId: string;
  moduleConfigId: string;
  value: number;
  direction?: 'INCREASE' | 'DECREASE';
}
