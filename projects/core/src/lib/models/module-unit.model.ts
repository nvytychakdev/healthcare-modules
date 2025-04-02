type ConvertFn = (value: number) => void;
type FormatFn = (value: number) => string;

export class ModuleUnit {
  private formatFn?: FormatFn;
  private convertMap: Map<string, ConvertFn> = new Map();

  constructor(
    public name: string,
    public shortName?: string,
  ) {}

  withConvertor(id: string, convertFn: ConvertFn) {
    this.convertMap.set(id, convertFn);
    return this;
  }

  withFormatter(formatFn: FormatFn) {
    this.formatFn = formatFn;
    return this;
  }

  convertTo(unit: string, value: number) {
    const convertFn = this.convertMap.get(unit);
    if (!convertFn) throw new Error(`Not able to convert ${value} into ${unit}`);
    return convertFn(value);
  }

  format(value: number) {
    const formatFn = this.formatFn;
    if (!formatFn) return String(value);
    return formatFn(value);
  }
}
