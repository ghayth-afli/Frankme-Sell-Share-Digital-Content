import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  signupForm!: FormGroup;
  ngOnInit() {
    this.signupForm = new FormGroup({
      email: new FormControl(null),
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(8),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        // this.confirmPassword,
      ]),
    });
  }

  onSubmit() {
    console.log(this.signupForm);
  }

  //confirm password validation
  confirmPassword(control: FormControl): { [s: string]: boolean } {
    if (control.value !== this.signupForm.controls['password'].value) {
      return { confirmPassword: true };
    }
    return { confirmPassword: false };
  }
}
