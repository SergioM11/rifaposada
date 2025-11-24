import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import {   MatInputModule, MatLabel } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [MatCardModule, MatFormFieldModule, MatLabel, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) { }
  username: string = '';
  password: string = '';

  onSubmit(){
    console.log('Formulario enviado');
    console.log('Usuario:', this.username);
    console.log('Contraseña:', this.password);

    //this.router.navigate(['/home']); // Cambiar '/dashboard' por la ruta a la que quieras redirigir

  }

}
