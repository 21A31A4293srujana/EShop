import { ProductSpecifications } from './CatalogProduct';

export default class CartProduct {
  public quantity: number = 1;
  constructor(
    public id: string,
    public name: string,
    public title: string,
    public description: string,
    public price: number,
    public category: string,
    public brand: string,
    public color: string,
    public imageUrl: string,
    public specifications: ProductSpecifications,
    public details: string[],
    public severity: Severity
  ) {
  }

  public updateQuantity(): void {
    this.quantity += 1;
    if (this.quantity > 10) this.quantity = 10;
  }
}

export enum Colors {
  RED = 'RED',
  BLUE = 'BLUE',
  GREEN = 'GREEN',
  BLACK = 'BLACK',
  WHITE = 'WHITE',
  INDIGO = 'INDIGO',
  GRAY = 'GRAY',
  ORANGE = 'ORANGE',
  PINK = 'PINK',
}

export enum Severity {
  success = 'success',
  info = 'info',
  warn = 'warn',
  error = 'error',
  contrast = 'contrast',
  secondary = 'secondary',
}

export type GenericToastProps = {
  severity: Severity;
  summary: string;
  detail: string;
};
