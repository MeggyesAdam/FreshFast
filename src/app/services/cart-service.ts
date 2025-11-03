import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item-interface';
import { Dish } from '../models/food-interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private db!: IDBDatabase;
  private readonly objectStoreName: string = 'cart';

  constructor() {
    this.initIndexedDB();
  }
  
  private initIndexedDB(): void {
    const request: IDBOpenDBRequest = indexedDB.open('cart-db', 1);
  
    request.onerror = (event: any) => {
      console.log('Detabase error:', event.target.error);
    };
  
    request.onupgradeneeded = (event: any) => {
      const db: IDBDatabase = event.target.result;
  
      const objectStore = db.createObjectStore(this.objectStoreName, { keyPath: 'id', autoIncrement: true });
    };

    request.onsuccess = (event: any) => {
      this.db = event.target.result;
      this.loadCartItems();
    };
  }

  private loadCartItems(): void {
    const objectStore = this.db.transaction(this.objectStoreName).objectStore(this.objectStoreName);

    objectStore.openCursor().onsuccess = (event: any) => {
      const cursor: IDBCursorWithValue = event.target.result;

      if (cursor) {
        this.cartItems.push({ ...cursor.value, id: cursor.value.id });
        cursor.continue();
      }
    };
  }

  public addToCart(dish: Dish, quantity: number = 1): void {
    const existingItem = this.cartItems.find(item => item.dish.id === dish.id);
    const objectStore = this.db.transaction(this.objectStoreName, 'readwrite').objectStore(this.objectStoreName);

    if (existingItem) {
      const newQuantity = quantity + existingItem.quantity;
      const request = objectStore.put({ ...existingItem, quantity: newQuantity });
      
      request.onsuccess = () => {
        existingItem.quantity = newQuantity;
      };
      
      request.onerror = (event: any) => {
        console.log('Update cart item error:', event.target.error);
      };
    } else {
      const request = objectStore.add({ dish, quantity });
      request.onsuccess = (event: any) => {
        this.cartItems.push({ id: event.target.result, dish, quantity });
      };

      request.onerror = (event: any) => {
        console.log('Add to cart error:', event.target.error);
      }
    }
  }

  public removeFromCart(dishId: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const itemToRemove = this.cartItems.find(item => item.dish.id === dishId);
      
      if (!itemToRemove || !itemToRemove.id) {
        console.log('Item not found in cart for removal:', dishId);
        resolve();
      } else {
        const objectStore = this.db.transaction(this.objectStoreName, 'readwrite').objectStore(this.objectStoreName);
        const request = objectStore.delete(itemToRemove.id);
        
        request.onsuccess = () => {
          this.cartItems = this.cartItems.filter(item => item.id !== itemToRemove.id);
          resolve();
        };
        
        request.onerror = (event: any) => {
          console.log('Remove from cart error:', event.target.error);
          reject(event.target.error);
        };
      }
    });
  }

  public updateCartItemQuantity(dishId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.dish.id === dishId);

    if (!item) {
      return;
    }

    if (quantity <= 0) {
      this.removeFromCart(dishId);
    } else {
      const objectStore = this.db.transaction(this.objectStoreName, 'readwrite').objectStore(this.objectStoreName);
      const request = objectStore.put({ ...item, quantity });
      request.onsuccess = () => {
        item.quantity = quantity;
      };

      request.onerror = (event: any) => {
        console.log('Update cart item error:', event.target.error);
      };
    }
  }

  public getCartItems(): CartItem[] {
    return this.cartItems;
  }

  public getCartTotal(): number {
    return this.cartItems.reduce((total, item) => total + (item.dish.price * item.quantity), 0);
  }

  public clearCart(): void {
    this.cartItems = [];
  }

  public getCartItemCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }
}
