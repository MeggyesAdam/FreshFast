import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { MatRadioModule } from '@angular/material/radio';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DataService } from '../../services/data-service';
import { CartItem } from '../../models/cart-item-interface';
import { User } from '../../models/user-interface';

@Component({
  selector: 'app-checkout',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatStepperModule,
    MatRadioModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    MatSnackBarModule
  ],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent implements OnInit {
  addressFormGroup!: FormGroup;
  paymentFormGroup!: FormGroup;
  cartItems: CartItem[] = [];
  user: User | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.cartItems = this.dataService.getCartItems();
    this.user = this.dataService.getUser();

    if (this.cartItems.length === 0) {
      this.snackBar.open('A kosarad üres!', 'Bezárás', { duration: 3000 });
      this.router.navigate(['/main']);
      return;
    }

    this.addressFormGroup = this.formBuilder.group({
      street: [this.user?.address?.street || '', Validators.required],
      city: [this.user?.address?.city || '', Validators.required],
      postalCode: [this.user?.address?.postalCode || '', [Validators.required, Validators.pattern(/^\d{4}$/)]],
      county: [this.user?.address?.county || '', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^(\+36|06)[0-9]{9}$/)]],
      additionalInfo: ['']
    });

    this.paymentFormGroup = this.formBuilder.group({
      paymentMethod: ['card', Validators.required],
      cardNumber: ['', [Validators.required, Validators.pattern(/^\d{16}$/)]],
      cardName: ['', Validators.required],
      expiryDate: ['', [Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]]
    });

    this.paymentFormGroup.get('paymentMethod')?.valueChanges.subscribe(method => {
      this.updatePaymentValidation(method);
    });
  }

  updatePaymentValidation(method: string): void {
    const cardNumber = this.paymentFormGroup.get('cardNumber');
    const cardName = this.paymentFormGroup.get('cardName');
    const expiryDate = this.paymentFormGroup.get('expiryDate');
    const cvv = this.paymentFormGroup.get('cvv');

    if (method === 'cash') {
      cardNumber?.clearValidators();
      cardName?.clearValidators();
      expiryDate?.clearValidators();
      cvv?.clearValidators();
    } else {
      cardNumber?.setValidators([Validators.required, Validators.pattern(/^\d{16}$/)]);
      cardName?.setValidators([Validators.required]);
      expiryDate?.setValidators([Validators.required, Validators.pattern(/^(0[1-9]|1[0-2])\/\d{2}$/)]);
      cvv?.setValidators([Validators.required, Validators.pattern(/^\d{3}$/)]);
    }

    cardNumber?.updateValueAndValidity();
    cardName?.updateValueAndValidity();
    expiryDate?.updateValueAndValidity();
    cvv?.updateValueAndValidity();
  }

  getSubtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.dish.price * item.quantity), 0);
  }

  getDeliveryFee(): number {
    return 500;
  }

  getTotal(): number {
    return this.getSubtotal() + this.getDeliveryFee();
  }

  placeOrder(): void {
    if (this.addressFormGroup.valid && this.paymentFormGroup.valid) {
      this.snackBar.open('Rendelés sikeresen leadva!', 'Bezárás', { duration: 5000 });
      
      this.dataService.clearCart();
      
      setTimeout(() => {
        this.router.navigate(['/main']);
      }, 2000);
    } else {
      this.snackBar.open('Kérjük, töltsd ki az összes kötelező mezőt', 'Bezárás', { duration: 3000 });
    }
  }

  goBack(): void {
    this.router.navigate(['/cart']);
  }
}
