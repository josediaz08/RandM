import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickMortyService } from '../services/rick-morty.service';

@Component({
  selector: 'app-personaje',
  templateUrl: './personaje.component.html',
  styleUrls: ['./personaje.component.css']
})
export class PersonajeComponent implements OnInit {
  personajeId: number | null = null;
  personaje: any;

  constructor(
    private route: ActivatedRoute,
    private rickMortyService: RickMortyService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.personajeId = id !== null ? +id : null;
      if (this.personajeId) {
        this.getPersonaje(this.personajeId);
      }
    });
  }

  getPersonaje(id: number) {
    this.rickMortyService.getCharacterById(id)
      .subscribe((personaje: any) => {
        this.personaje = personaje;
      });
  }
}
