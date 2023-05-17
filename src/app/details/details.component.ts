import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RickAndMortyService } from '../service/rick-and-morty.service';
import { Character } from '../model/rickandmorty';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  character!: Character;

  constructor(
    private route: ActivatedRoute,
    private rickAndMortyService: RickAndMortyService
  ) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;

    this.rickAndMortyService.getCharacterById(id).subscribe((data) => {
      this.character = data;
    });
  }
}
