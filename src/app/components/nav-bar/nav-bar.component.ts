import { Component, inject } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from '../../services/data-service';
import { UserProfileDialogComponent } from '../user-profile-dialog/user-profile-dialog.component';

@Component({
  selector: 'nav-bar',
  imports: [MatRippleModule, MatIconModule, MatBadgeModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.scss'
})
export class NavBarComponent {
  isMainPage: boolean = false;
  userName: string = '';
  cartItemCount: number = 0;

  private dialog = inject(MatDialog);

  constructor(private router: Router, private dataService: DataService) {
    router.events.subscribe(() => {
      this.isMainPage = router.url === '/';
    });

    this.userName = this.dataService.getUser()?.username || '';
    this.cartItemCount = this.dataService.getCartItemCount();
  }

  onLogoClick() {
    this.router.navigate(['/']);
  }

  onLogout() {
    this.router.navigate(['/login']);
  }

  onShop() {
    this.router.navigate(['/cart']);
  }

  openUserProfile() {
    this.dialog.open(UserProfileDialogComponent, {
      width: '600px',
      maxWidth: '90vw',
      autoFocus: true,
      restoreFocus: true
    });
  }
}
