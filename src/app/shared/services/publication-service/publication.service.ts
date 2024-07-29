import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root',
})
export class PublicationService {
  private httpClient: HttpClient = inject(HttpClient);

  getPublications() {
    return this.httpClient.get(`${environment.apiBaseUrl}/publications`);
  }
}
