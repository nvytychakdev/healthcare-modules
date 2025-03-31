export interface ModulePrimitive {
  id: string;
  craeteDateTime: string;
  updateDateTime: string;
  moduleId: string;
  moduleConfigId: string;
  value: number;
  direction?: 'INCREASE' | 'DECREASE';
}
