import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Movie } from '../models/movie';
import { CacheService } from './cache.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private baseUrl = environment.moviesApi.url;
  constructor(private http: HttpClient, private cacheService: CacheService) { }


  search(title: string, page: number = 1, year: number = null): Observable<Array<Movie>> {
    let query = `s=${title}&type=movie&page=${page}&y=${year}`;
    if (title) {
      const cachedData = this.cacheService.getCachedData(query);
      if (cachedData)
        return of(cachedData);
      else
        return this.http.get<Array<Movie>>(`${this.baseUrl}&${query}`)
          .pipe(map(res => {
            this.cacheService.setCachedData(query, res);
            return res;
          }));
    }
    else
      return of([]);
  }
  getMovie(id: string): Observable<Movie> {
    let query = `i=${id}&type=movie`;
    if (id) {
      const cachedData = this.cacheService.getCachedData(query);
      if (cachedData)
        return of(cachedData);
      else
        return this.http.get<Movie>(`${this.baseUrl}&${query}`)
          .pipe(map(res => {
            this.cacheService.setCachedData(query, res);
            return res;
          }));
    }
    else
      throw 'missing movie id';
  }
}
