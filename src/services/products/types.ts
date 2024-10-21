export interface ProductEntity {
  id: number;
  productName: string;
  specification: string;
  detail: string;
  price: number;
  stock: number;
  categoryId: number;
  productPicture?: string;
}

export interface ProductDTO {
  id: number;
  productName: string;
  specification: string;
  detail: string;
  price: number;
  stock: number;
  categoryId: number;
  productPicture?: { url: string }[];
}

export interface ProductCreateDTO {
  productName: string;
  specification: string;
  detail: string;
  price: number;
  stock: number;
  categoryId: number;
  productPicture?: File;
}

export interface ProductUpdateDTO {
  productName?: string;
  specification?: string;
  detail?: string;
  price?: number;
  stock?: number;
  categoryId?: number;
  productPicture?: File;
}

export interface Category {
  id: number;
  productName: string;
}

export interface Product extends ProductDTO {
  category: Category;
}
