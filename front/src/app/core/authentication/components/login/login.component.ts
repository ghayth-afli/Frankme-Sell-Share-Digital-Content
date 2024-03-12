import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  acitivateRegister = false;
  registerForm() {
    this.acitivateRegister = true;
    console.log('Register form activated');
  }
  onHideRegister(r: { r: boolean }) {
    this.acitivateRegister = !r.r;
  }
}
