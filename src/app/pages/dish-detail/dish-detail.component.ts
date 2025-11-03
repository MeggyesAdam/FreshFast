import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../services/data-service';
import { Dish } from '../../models/food-interface';
import { MatButtonModule } from "@angular/material/button";
import {MatIconModule} from '@angular/material/icon';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';
import { CartService } from '../../services/cart-service';

@Component({
  selector: 'app-dish-detail',
  imports: [MatButtonModule, MatIconModule, NavBarComponent],
  templateUrl: './dish-detail.component.html',
  styleUrl: './dish-detail.component.scss'
})
export class DishDetailComponent {
  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService, private cartService: CartService) {}
  dishId: number | null = null;
  dish : Dish | null = null;
  allergens: string[] = [];
  ingrediens: string[] = [];
  quantity: number = 1;
  currentPrice: number = 0;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.dishId = +params['id'];
      this.dish = this.dataService.getDishes().find(dish => dish.id === this.dishId) || null;
      if (!this.dish) {
        this.router.navigate(['404']);
      }
      this.allergens = this.dish!.allergens;
      this.ingrediens = this.dish!.ingredients;
      this.currentPrice = this.dish!.price;
    });
  }

  modifyQuantity(amount: number) {
    const newQuantity = this.quantity + amount;
    this.quantity = newQuantity > 0 ? newQuantity : 1;
    this.currentPrice = this.dish!.price * this.quantity;
  }

  onAddToCart() {
    if (this.dish) {
      this.cartService.addToCart(this.dish, this.quantity);
    }
  }

  onBack() {
    this.router.navigate(['']);
  }
}
