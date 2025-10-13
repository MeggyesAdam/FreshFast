import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { User } from '../../models/user-interface';
import { DataService } from '../../services/data-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent {
  authForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dataService: DataService, private router: Router) {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      username: ['']
    });
  }

  loginSubmit() {
    if (this.authForm.valid && this.dataService.getUser() !== null) {
      this.router.navigate(['']);
    }
  }

  registerSubmit() {
    if (this.authForm.valid && this.dataService.getUser() === null) {
      const user: User = {
        id: 1,
        email: this.authForm.value.email,
        username: this.authForm.value.username,
      };
      this.dataService.setUser(user);
      this.router.navigate(['']);
    }
  }

  isValid() {
    console.log(this.authForm.valid);
    console.log(this.authForm.getRawValue());
  }
}