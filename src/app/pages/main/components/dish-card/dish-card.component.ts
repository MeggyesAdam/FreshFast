import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { Dish } from '../../../../models/food-interface';
import { Router } from '@angular/router';
import { MatRippleModule } from '@angular/material/core';
import { DataService } from '../../../../services/data-service';

@Component({
  selector: 'dish-card',
  imports: [MatCardModule, MatButtonModule, MatIconModule, MatRippleModule],
  templateUrl: './dish-card.component.html',
  styleUrl: './dish-card.component.scss'
})
export class DishCardComponent {
  @Input() dish?: Dish;

  constructor(private router: Router, private dataService: DataService) {}

  onAddToCart(event?: Event) {
    if (event) {
      event.stopPropagation();
    }
    if (this.dish) {
      this.dataService.addToCart(this.dish);
      console.log('Added to cart:', this.dish.name);
    }
  }

  onCardClick() {
    if (this.dish) {
      this.router.navigate(['/dish', this.dish.id]);
    }
  }
}
