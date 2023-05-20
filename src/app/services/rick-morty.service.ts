import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RickMortyService {
  private apiUrl = 'https://rickandmortyapi.com/api/character';

  constructor(private http: HttpClient) { }

  getCharacterById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getCharacters() {
    return this.http.get(this.apiUrl);
  }

  getAllCharacters() {
    return this.getCharacters().pipe(
      switchMap((data: any) => {
        console.log(data); // Agrega este registro para verificar la estructura de la respuesta
        const totalPages = data.info.pages;
        const characters: any[] = [];
  
        return this.getPaginatedCharacters(totalPages, characters);
      })
    );
  }
  

  private getPaginatedCharacters(totalPages: number, characters: any[]): Observable<any[]> {
    if (totalPages === 0) {
      return of(characters);
    }

    const page = totalPages;
    return this.http.get(`${this.apiUrl}/?page=${page}`).pipe(
      switchMap((data: any) => {
        characters.push(...data.results);
        return this.getPaginatedCharacters(totalPages - 1, characters);
      })
    );
  }
}
