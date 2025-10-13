import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { DataService } from '../../services/data-service';
import { User, UserAddress } from '../../models/user-interface';

@Component({
  selector: 'app-user-profile-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './user-profile-dialog.component.html',
  styleUrl: './user-profile-dialog.component.scss'
})
export class UserProfileDialogComponent {
  private dialogRef = inject(MatDialogRef<UserProfileDialogComponent>);
  private dataService = inject(DataService);

  email: string = '';

  street: string = '';
  city: string = '';
  postalCode: string = '';
  county: string = '';

  constructor() {
    const user = this.dataService.getUser();
    if (user) {
      this.email = user.email;
      if (user.address) {
        this.street = user.address.street;
        this.city = user.address.city;
        this.postalCode = user.address.postalCode;
        this.county = user.address.county;
      }
    }
  }

  saveEmail(): void {
    if (this.dataService.getUser() && this.email.trim()) {
      this.dataService.setUserEmail(this.email.trim());
      console.log('Email updated:', this.email);
    }
  }

  saveAddress(): void {
    if (this.dataService.getUser()) {
      const address: UserAddress = {
        street: this.street.trim(),
        city: this.city.trim(),
        postalCode: this.postalCode.trim(),
        county: this.county.trim()
      };
      this.dataService.setUserAddress(address);
      console.log('Address updated:', address);
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
