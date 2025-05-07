export default class CatalogProduct {
  id: string;
  name: string;
  title: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: string;
  brand: string;
  specifications: {
    powerConsumption?: string;
    dimensions?: string;
    weight?: string;
    warranty?: string;
    features?: string[];
    [key: string]: any;
  };
  color: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<CatalogProduct> = {}) {
    this.id = data.id || '';
    this.name = data.name || '';
    this.title = data.title || '';
    this.description = data.description || '';
    this.price = data.price || 0;
    this.stockQuantity = data.stockQuantity || 0;
    this.category = data.category || '';
    this.brand = data.brand || '';
    this.specifications = data.specifications || {};
    this.color = data.color || '';
    this.imageUrl = data.imageUrl || '';
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }
}

export interface ProductSpecifications {
  dimensions?: string;
  weight?: string;
  powerConsumption?: string;
  warranty?: string;
  features?: string[];
}

export interface ItemVariant {
  color: Colors;
  specifications: ProductSpecifications;
}

export enum Colors {
  BLACK = 'BLACK',
  WHITE = 'WHITE',
  SILVER = 'SILVER',
  GOLD = 'GOLD',
  SPACE_GRAY = 'SPACE_GRAY',
  ROSE_GOLD = 'ROSE_GOLD',
  BLUE = 'BLUE',
  RED = 'RED',
}
