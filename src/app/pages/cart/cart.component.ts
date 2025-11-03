import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { CartItem } from '../../models/cart-item-interface';
import { CartService } from '../../services/cart-service';

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
    private cartService: CartService,
    private router: Router
  ) {
    this.loadCart();
  }

  loadCart(): void {
    this.cartItems = this.cartService.getCartItems();
    this.total = this.cartService.getCartTotal();
  }

  increaseQuantity(dishId: number): void {
    const item = this.cartItems.find(item => item.dish.id === dishId);
    if (item) {
      this.cartService.updateCartItemQuantity(dishId, item.quantity + 1);
      this.loadCart();
    }
  }

  decreaseQuantity(dishId: number): void {
    const item = this.cartItems.find(item => item.dish.id === dishId);
    if (item) {
      this.cartService.updateCartItemQuantity(dishId, item.quantity - 1);
      this.loadCart();
    }
  }

  async removeItem(dishId: number): Promise<void> {
    await this.cartService.removeFromCart(dishId);
    this.loadCart();
  }

  checkout(): void {
    this.router.navigate(['/checkout']);
  }
}
