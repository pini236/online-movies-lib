import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  cache = {};
  constructor() { }

  getCachedData(key) {
    return this.cache[key];
  }
  setCachedData(key, value) {
    this.cache[key] = value;
  }
}
