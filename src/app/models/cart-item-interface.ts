import { Dish } from './food-interface';

export interface CartItem {
  id?: number;
  dish: Dish;
  quantity: number;
}
