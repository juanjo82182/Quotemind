import { Component } from '@angular/core';
import { inject, Injectable } from "@angular/core";
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../shared/data/storage.service';
import { LibrosService } from '../crud/data/libros.service'; 

interface Libro {
  id: number; 
  title: string; 
  author: string; 
  genre?: string; 
  published_date?: Date; 
  isbn?: string; 
  created_at?: Date; 
  updated_at?: Date; 
}

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [RouterLink,CommonModule,ReactiveFormsModule],
  templateUrl: './crud.component.html',
  styles: ``
})
export default class CrudComponent {

  private _storage = inject(StorageService);
  private _librosService = inject(LibrosService);

  modalAbierto: boolean = false; 
  libroId: number | null = null;  
  libroAEditar: Libro | null = null;
  modalEditarAbierto: boolean = false;

  libros: Libro[] = []; 
  form: FormGroup; 

  constructor(private _formBuilder: FormBuilder) {
    this.form = this._formBuilder.group({
      title: this._formBuilder.nonNullable.control('', Validators.required),
      author: this._formBuilder.nonNullable.control('', Validators.required),
      genre: this._formBuilder.nonNullable.control(''), 
      published_date: this._formBuilder.nonNullable.control(''), 
      isbn: this._formBuilder.nonNullable.control(''), 
    });
  }

  isDropdownOpen = false;  
 

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  signOut() {
    this._storage.remove('session'); 
  }
  

  ngOnInit() {
    this.obtenerLibros(); 
  }

  obtenerLibros() {
    this._librosService.getLibros().subscribe({
      next: (data) => {
        this.libros = data.map(libro => ({
          ...libro,
          published_date: new Date(libro.published_date).setDate(new Date(libro.published_date).getDate() + 1) 
        })); 
      },
      error: (error) => {
        console.error('Error al obtener libros:', error);
      },
    });
  }

 
  abrirModal(id: number) {
    this.libroId = id;
    this.modalAbierto = true;
  }
  
  cerrarModal() {
    this.modalAbierto = false;
    this.libroId = null;
  }
  
  eliminarLibro(id: number) {
    this._librosService.deleteLibro(id).subscribe({
      next: () => {
        this.libros = this.libros.filter(libro => libro.id !== id);
        this.cerrarModal(); 
      },
      error: (error) => {
        console.error('Error al eliminar libro:', error);
      },
    });
  }



 abrirModalEditar(id: number) {
  this.libroId = id; 

  this._librosService.getLibro(id).subscribe({
    next: (libro) => {
      if (libro.published_date) {
        libro.published_date = new Date(libro.published_date).toISOString().split('T')[0]; 
      }
      this.libroAEditar = libro; 
      this.form.patchValue(libro); 
      this.modalEditarAbierto = true; 
    },
    error: (error) => {
      console.error('Error al obtener libro:', error);
    },
  });
}

cerrarModalEditar() {
  this.modalEditarAbierto = false;
    this.libroId = null;
    this.libroAEditar = null; 
    this.form.reset(); 
}

editarLibro() {
  if (this.libroId !== null) {
    const libroData = this.form.value;
    if (libroData.published_date) {
      libroData.published_date = new Date(libroData.published_date + 'T00:00:00Z'); 
    }

    this._librosService.updateLibro(this.libroId, libroData).subscribe({
      next: () => {
        const index = this.libros.findIndex(libro => libro.id === this.libroId);
        if (index !== -1) {
          this.libros[index] = { ...this.libros[index], ...libroData };
        }
        this.cerrarModalEditar();
        this.obtenerLibros();
      },
      error: (error) => {
        console.error('Error al editar libro:', error);
      },
    });
  }
}

}
