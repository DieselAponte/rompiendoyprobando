// ...existing code...
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: false,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) return;

    this.isLoading = true;

    const { username, password } = this.loginForm.value;
    this.authService.login(username, password).subscribe({
      next: (user) => {
        console.log('Usuario autenticado:', user);
        // Navegar a la ruta definida en AppRoutingModule
        this.router.navigate(['/GestionAlmacenamiento'])
          .then((ok) => {
            // desactivar loading cuando la navegación complete (ok = true si tuvo éxito)
            this.isLoading = false;
          })
          .catch((err) => {
            console.error('Error en navegación:', err);
            this.isLoading = false;
          });
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        this.isLoading = false;
      }
    });
  }
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          