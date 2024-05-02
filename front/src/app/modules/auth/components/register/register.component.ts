import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  // Input and output properties
  @Input() acitivateRegister: boolean;
  @Output() hideRegister = new EventEmitter<{ r: boolean }>();

  public signupForm: FormGroup;

  constructor(private authService: AuthService) {}
  // Initialize the form
  ngOnInit() {
    this.signupForm = new FormGroup(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        firstName: new FormControl('', [Validators.required]),
        lastName: new FormControl('', [Validators.required]),
        phoneNumber: new FormControl('', [Validators.required]),
        password: new FormControl('', [Validators.required]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      {
        validators: [
          this.passwordMatchValidator as ValidatorFn,
          this.passwordValidator as ValidatorFn,
        ],
      }
    );
  }

  // Custom validator function to check if passwords match
  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (passwordControl?.value !== confirmPasswordControl?.value) {
      confirmPasswordControl?.setErrors({ passwordMismatch: true });
    } else {
      confirmPasswordControl?.setErrors(null);
    }
  }

  // Custom password validator
  passwordValidator(control: FormControl) {
    const passwordControl = control.get('password');
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/;
    if (!passwordRegex.test(passwordControl?.value)) {
      passwordControl?.setErrors({ invalidPassword: true });
    } else {
      passwordControl?.setErrors(null);
    }
  }

  // Submit register form
  onSubmit() {
    const { firstName, lastName, email, password, phoneNumber } =
      this.signupForm.value;
    this.authService
      .register(firstName, lastName, email, password, phoneNumber)
      .subscribe({
        next: (response) => {
          console.log('yeeeeeeeee', response);
          this.hideForm();
        },
        error: (error) => console.error(error),
      });
  }

  // Hide the register form
  hideForm() {
    this.hideRegister.emit({ r: true });
  }
}
