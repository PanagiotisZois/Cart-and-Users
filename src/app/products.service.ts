import { Injectable, signal } from '@angular/core';
import { Cart, Product } from './product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  // Initialize cart with products and total
  cart = signal<Cart>({
    products: [], // Empty list initially
    total: 0, // Total starts at 0
  });

  products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      price: 100,
      description: 'Description 1',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 200,
      description: 'Description 2',
    },
    {
      id: 3,
      name: 'Product 3',
      price: 300,
      description: 'Description 3',
    },
  ];

  constructor() {}
}
