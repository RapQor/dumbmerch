import { ProductEntity } from "../products/types";

export interface CategoryEntity {
  id: number;
  categoryName: string;
  products?: ProductEntity[];
}

export interface CategoryCreateDTO {
  categoryName: string;
}

export interface CategoryUpdateDTO {
  categoryName: string;
}
