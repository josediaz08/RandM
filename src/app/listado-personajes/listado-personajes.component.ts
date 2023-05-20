import { Component, OnInit } from '@angular/core';
import { RickMortyService } from '../services/rick-morty.service';

@Component({
  selector: 'app-listado-personajes',
  templateUrl: './listado-personajes.component.html',
  styleUrls: ['./listado-personajes.component.css']
})
export class ListadoPersonajesComponent implements OnInit {
  personajes: any[] = [];
  filteredPersonajes: any[] = [];
  currentPage = 1;
  pageSize = 10;
  totalPages = 0;
  searchValue = '';

  constructor(private rickMortyService: RickMortyService) {}

  ngOnInit() {
    this.loadPersonajes();
  }

  loadPersonajes() {
    this.rickMortyService.getAllCharacters().subscribe((characters: any[]) => {
      this.personajes = characters;
      this.filteredPersonajes = this.personajes;
      this.totalPages = this.calculateTotalPages();
      this.updateFilteredPersonajes();
    });
  }

  onSearchInputChange(event: any) {
    const value = event.target.value;
    this.searchValue = value;
    this.filteredPersonajes = this.personajes.filter((personaje) =>
      personaje.name.toLowerCase().includes(value.toLowerCase()) ||
      personaje.gender.toLowerCase().includes(value.toLowerCase()) ||
      personaje.status.toLowerCase().includes(value.toLowerCase()) ||
      personaje.species.toLowerCase().includes(value.toLowerCase()) ||
      personaje.origin.name.toLowerCase().includes(value.toLowerCase()) ||
      personaje.location.name.toLowerCase().includes(value.toLowerCase())
    );
    this.currentPage = 1; // Resetear la página actual al hacer una búsqueda
  }

  getGenderResults(gender: string): number {
    return this.filteredPersonajes.filter(personaje => this.checkFieldContainsValue(personaje.gender, this.searchValue)).length;
  }

  getStatusResults(status: string): number {
    return this.filteredPersonajes.filter(personaje => this.checkFieldContainsValue(personaje.status, this.searchValue)).length;
  }

  getSpeciesResults(species: string): number {
    return this.filteredPersonajes.filter(personaje => this.checkFieldContainsValue(personaje.species, this.searchValue)).length;
  }

  getOriginResults(origin: string): number {
    return this.filteredPersonajes.filter(personaje => this.checkFieldContainsValue(personaje.origin.name, this.searchValue)).length;
  }

  getLocationResults(location: string): number {
    return this.filteredPersonajes.filter(personaje => this.checkFieldContainsValue(personaje.location.name, this.searchValue)).length;
  }

  checkFieldContainsValue(field: string | undefined, value: string): boolean {
    return field !== undefined && field.toLowerCase().includes(value.toLowerCase());
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateFilteredPersonajes();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateFilteredPersonajes();
    }
  }

  isFirstPage(): boolean {
    return this.currentPage === 1;
  }

  isLastPage(): boolean {
    return this.currentPage === this.totalPages;
  }

  calculateTotalPages(): number {
    return Math.ceil(this.personajes.length / this.pageSize);
  }

  updateFilteredPersonajes() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.filteredPersonajes = this.personajes.slice(startIndex, endIndex);
  }
}
