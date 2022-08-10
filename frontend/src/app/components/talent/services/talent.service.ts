import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BackendService } from 'src/app/configures/backend.service';

@Injectable({
  providedIn: 'root',
})
export class TalentService {
  constructor(private backend: BackendService, private http: HttpClient) {}

  urlPath = this.backend.backendPath + 'talents';

  getTalentGeneralInfo() {
    // http://localhost:3000/talents
    return this.http.get(this.urlPath);
  }

  toggleFavorite(id: string) {
    // http://localhost:3000/talents/:id/favorite
    return this.http.put(`${this.urlPath}/${id}/favorite`, undefined);
  }
}
