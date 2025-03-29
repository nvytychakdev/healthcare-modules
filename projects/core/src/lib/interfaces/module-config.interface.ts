export interface ModuleConfig {
  id: string;
  moduleId: string;
  createDateTime: string;
  updateDateTime: string;
  order: number;
  ragThreshold: [];
  moduleName?: string;
  status: 'ENABLED' | 'DISABLED';
  configBody?: Record<string, unknown>;
}

export interface RagThreshold {
  type: 'VALUE';
  severity: number;
  thresholdRange: RagThresholdRange[];
  color: string;
  fieldName: string;
  enabled: boolean;
}

export type RagThresholdRange =
  | { minValue: number }
  | { maxValue: number }
  | { minValue: number; maxValue: number };
