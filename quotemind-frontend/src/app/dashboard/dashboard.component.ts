import { Component } from '@angular/core';
import { inject, Injectable } from "@angular/core";
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../shared/data/storage.service';
import { LibrosService } from '../dashboard/data/libros.service'; 

interface LibroForm {
  title: FormControl<string>;
  author: FormControl<string>;
  genre: FormControl<string>;
  publishedDate: FormControl<string>;
  isbn: FormControl<string>;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './dashboard.component.html',
  styles: ``
})
export default class DashboardComponent {

  private _storage = inject(StorageService);
  private _librosService = inject(LibrosService);

  form: FormGroup<LibroForm>;

  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group<LibroForm>({
      title: this._formBuilder.nonNullable.control('', Validators.required),
      author: this._formBuilder.nonNullable.control('', Validators.required),
      genre: this._formBuilder.nonNullable.control('', Validators.required),
      publishedDate: this._formBuilder.nonNullable.control('', Validators.required),
      isbn: this._formBuilder.nonNullable.control('', Validators.required), 
    });
  }

  isDropdownOpen = false;  
 

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

 
  signOut() {
    this._storage.remove('session'); 
  }

 
  submit() {
    console.log('Formulario enviado');

    if (this.form.invalid) return;

    const { title, author, genre, publishedDate, isbn } = this.form.getRawValue();

    const published_date = new Date(publishedDate);

    this._librosService.createLibro({ title, author, genre, published_date, isbn }).subscribe({
      next: (response) => {
        console.log('Libro creado:', response);
        this.form.reset(); 
      },
      error: (error) => {
        console.error('Error al crear libro:', error);
      },
    });
  }
  
}
