import { Component } from '@angular/core';
import { MenuFilterComponent } from "./components/menu-filter/menu-filter.component";
import { DishCardComponent } from './components/dish-card/dish-card.component';
import { Dish, DishCategory } from '../../models/food-interface';
import { MatGridListModule } from '@angular/material/grid-list';
import { DataService } from '../../services/data-service';
import { NavBarComponent } from '../../components/nav-bar/nav-bar.component';

@Component({
  selector: 'app-main',
  imports: [MenuFilterComponent, DishCardComponent, MatGridListModule, NavBarComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  availableDishes: Dish[] | null = null;
  filteredDishes: Dish[] | null = null;

  constructor(private dataService: DataService) {
    this.availableDishes = this.dataService.getDishes();
    this.filteredDishes = this.availableDishes;
  }

  onFilterSelected(filter: string | null) {
    if (this.availableDishes === null) {
      return;
    }
    if (filter === null) {
      this.filteredDishes = this.availableDishes;
      return;
    }
    this.filteredDishes = this.availableDishes.filter((dish: Dish) => {
      return dish.category === filter;
    });
  }
}
