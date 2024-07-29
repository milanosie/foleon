import {Component, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PublicationService} from "../../shared/services/publication-service/publication.service";

@Component({
  selector: 'foleon-landing',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './landing.component.html'
})
export class LandingComponent implements OnInit {
  private publicationService: PublicationService = inject(PublicationService);

  ngOnInit() {
    this.publicationService.getPublications().subscribe(publications => {
      console.log(publications);
    });
  }

}
