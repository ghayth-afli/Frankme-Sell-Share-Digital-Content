import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../../../core/services/TokenStorage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  public signinForm: FormGroup;

  acitivateRegister = false;
  registerForm() {
    this.acitivateRegister = true;
    console.log('Register form activated');
  }
  onHideRegister(r: { r: boolean }) {
    this.acitivateRegister = !r.r;
  }
  constructor(
    private authService: AuthService,
    private router: Router,
    private tokenStorage: TokenStorageService
  ) {}

  // Initialize the form
  ngOnInit() {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    const { email, password } = this.signinForm.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        this.tokenStorage.saveToken(response.accessToken);
        this.tokenStorage.saveRefreshToken(response.refreshToken);
        this.router.navigate(['/user/dashboard']);
      },
      error: (loginError) => {
        console.error('Error during login', loginError);
        // Handle login error
        // Optionally, display an error message to the user
      },
    });
  }
}
