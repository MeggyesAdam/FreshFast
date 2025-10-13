import { Component, EventEmitter, Output } from '@angular/core';
import { MatChipsModule } from '@angular/material/chips';
import { DishCategory } from '../../../../models/food-interface';

@Component({
  selector: 'app-menu-filter',
  imports: [MatChipsModule],
  templateUrl: './menu-filter.component.html',
  styleUrl: './menu-filter.component.scss'
})
export class MenuFilterComponent {
  filters: string[] = DishCategory ? Object.values(DishCategory) : [];
  selectedFilter: string | null = null;

  @Output() filterSelected = new EventEmitter<string | null>();

  selectFilter(filter: string) {
    if (this.selectedFilter === filter) {
      this.selectedFilter = null; 
    } else {
      this.selectedFilter = filter;
    }

    this.filterSelected.emit(this.selectedFilter);
  }
}
