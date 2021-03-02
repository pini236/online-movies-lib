import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private baseUrl = environment.moviesApi.url;
  constructor(private http: HttpClient) { }

  search(title: string, page: number = 1, year: number=null): Observable<Array<Movie>> {
    if (title)
      return this.http.get<Array<Movie>>(`${this.baseUrl}&s=${title}&type=movie&page=${page}&yaer=${year}`)
    else
      throw 'missing movie title';
  }
}
