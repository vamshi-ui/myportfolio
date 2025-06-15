import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { API_CONST } from '../constants/api.constant';
import { CommonModule } from '@angular/common';
import { SocialLinksComponent } from "../social-links/social-links.component";

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule, FormsModule, CommonModule, SocialLinksComponent],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  form!: FormGroup;
  loading = false;
  @ViewChildren('formInput') formInputs!: QueryList<ElementRef>;
  
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], // Minimum 3 characters
      emailId: ['', [Validators.required, Validators.email]], // Valid email
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]], // 10-digit number
      message: ['', [Validators.required, Validators.maxLength(500)]], // Max 500 characters
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.formInputs.forEach((input) => {
        const controlName = input.nativeElement.getAttribute('formControlName');
        if (controlName && this.form.get(controlName)?.invalid) {
          input.nativeElement.classList.add('my-shake');
          setTimeout(() => {
            input.nativeElement.classList.remove('my-shake');
          }, 500);
        }
      });
      return;
    }

    this.loading = true;
    this.http
      .post(`${environment.baseUrl}${API_CONST.clientEnquiry}`, this.form.value)
      .subscribe({
        next: (res: any) => {
          alert(res.message);
          this.form.reset();
          this.loading = false;
        },
        error: (err: any) => {
          alert(err.error?.message || 'An error occurred');
          this.loading = false;
        },
      });
  }
}