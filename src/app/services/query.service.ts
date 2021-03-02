import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueryService {
  title: string;
  year: number;

  constructor() { }
}
