import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StorageService } from '../shared/data/storage.service';
import { NytBooksService } from './data/nyt-books.service';

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './catalogo.component.html',
  styles: ``
})
export default class CatalogoComponent implements OnInit {

  books: any[] = [];

  constructor(private nytBooksService: NytBooksService) {}

  private _storage = inject(StorageService);

  isDropdownOpen = false;  
 

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  signOut() {
    this._storage.remove('session'); 
  }
  
  ngOnInit(): void {
    this.nytBooksService.getBestSellers().subscribe(
      (data) => {
        this.books = data.results;
      },
      (error) => {
        console.error('Error fetching books:', error);
      },
    );
  }

  loadMoreBooks(): void {
    this.nytBooksService.getBestSellers().subscribe(
      (data) => {
        this.books.push(...data.results);  // Añade más libros a la lista
      },
      (error) => {
        console.error('Error fetching more books:', error);
      },
    );
  }

}
