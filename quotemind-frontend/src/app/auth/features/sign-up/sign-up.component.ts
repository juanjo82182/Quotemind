import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../data/auth.service';

interface LoginForm{
  nombre: FormControl<string>;
  email: FormControl<string>;
  contrasena: FormControl<string>;
}

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styles: ``
})
export default class SignUpComponent {

  private _authService = inject(AuthService);

  private _router = inject(Router);

   form: FormGroup<LoginForm>;

  constructor(private _formBuilder: FormBuilder){
      this.form = this._formBuilder.group<LoginForm>({
      nombre: this._formBuilder.nonNullable.control('', Validators.required),
      email: this._formBuilder.nonNullable.control('', [Validators.required, Validators.email]),
      contrasena: this._formBuilder.nonNullable.control('', Validators.required),
    });
  }

  submit(){
    if(this.form.invalid) return; 

    const {nombre, email, contrasena} = this.form.getRawValue();

    this._authService.signUp(nombre,email,contrasena).subscribe({
      next: (response) => {
        this._router.navigateByUrl('/dashboard');
      },
      error: (error) => console.log(error),
    });
  }
}
