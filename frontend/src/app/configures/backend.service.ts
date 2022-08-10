import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor() {}

  backendPath = 'http://localhost:3000/';
}
