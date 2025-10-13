import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { DataService } from '../../services/data-service';
import { CartItem } from '../../models/cart-item-interface';

@Component({
  selector: 'app-cart',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    NavBarComponent
  ],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(
    private dataService: DataService,
    private router: Router
  ) {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.dataService.getCartItems();
    this.total = this.dataService.getCartTotal();
  }

  increaseQuantity(dishId: number): void {
    const item = this.cartItems.find(item => item.dish.id === dishId);
    if (item) {
      this.dataService.updateCartItemQuantity(dishId, item.quantity + 1);
      this.loadCart();
    }
  }

  decreaseQuantity(dishId: number): void {
    const item = this.cartItems.find(item => item.dish.id === dishId);
    if (item) {
      this.dataService.updateCartItemQuantity(dishId, item.quantity - 1);
      this.loadCart();
    }
  }

  removeItem(dishId: number): void {
    this.dataService.removeFromCart(dishId);
    this.loadCart();
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }
}
