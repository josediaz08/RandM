import { Component, OnInit } from '@angular/core';
import { RickAndMortyService } from '../service/rick-and-morty.service';
import { Character } from '../model/rickandmorty';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  characters!: Character[];
  filteredCharacters!: Character[];
  currentPage = 1;
  pageSize = 10;
  totalPages: number = 0;
  searchValue = '';

  constructor(private rickAndMortyService: RickAndMortyService) {}

  ngOnInit() {
    this.loadCharacters();
  }

  loadCharacters() {
    this.rickAndMortyService.getAllCharacters().subscribe((data: any) => {
      this.characters = data.results;
      this.filteredCharacters = this.characters;
      this.totalPages = this.calculateTotalPages();
      this.updateFilteredCharacters();
    });
  }

  onSearchInputChange(value: string) {
    this.searchValue = value;
    this.filteredCharacters = this.characters.filter((character) =>
      character.name.toLowerCase().includes(value.toLowerCase())
    );
    this.currentPage = 1; // Resetear la página actual al hacer una búsqueda
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateFilteredCharacters();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateFilteredCharacters();
    }
  }

  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  isLastPage(): boolean {
    return this.currentPage === this.totalPages;
  }

  getTotalPages(): number {
    return Math.ceil(this.filteredCharacters.length / this.pageSize);
  }

  calculateTotalPages(): number {
    return Math.ceil(this.characters.length / this.pageSize);
  }

  updateFilteredCharacters() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredCharacters = this.characters.slice(startIndex, endIndex);
  }
}
