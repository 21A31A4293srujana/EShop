import { ProductSpecifications } from './CatalogProduct';

export interface Product {
  id: string;
  name: string;
  title: string;
  description: string;
  price: number;
  stockQuantity: number;
  category: string;
  brand: string;
  specifications: ProductSpecifications;
  color: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  rating?: number;
  reviews?: number;
} 