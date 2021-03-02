import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';
import { QueryService } from 'src/app/services/query.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  responsiveOptions;
  loader = true;
  totalResults: any;
  searchRes: any;
  searchStr: string = '';
  yearStr: number;
  years: Array<number>;

  constructor(private moviesService: MoviesService, private queryService: QueryService) {
    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];
    this.setYearsRange();
  }
  setYearsRange() {
    const currentYear = new Date().getFullYear();
    this.years = Array.from(Array(currentYear).keys()).map((i) => currentYear - i);
  }

  ngOnInit() {
    this.searchStr = this.queryService.title;
    this.yearStr = this.queryService.year;
    if (this.searchStr)
      this.searchMovies();
  }
  changePage(event) {
    this.searchMovies(event.pageIndex + 1);
  }

  searchMovies(page: number = 1) {
    this.loader = true;
    this.queryService.title = this.searchStr;
    this.queryService.year = this.yearStr;
    this.moviesService.search(this.searchStr, page, this.yearStr).subscribe((res: any) => {
      this.searchRes = res.Search;
      this.loader = false;
      this.totalResults = res.totalResults;
    });
  }
  filterMovies() {
    this.loader = true;
    this.queryService.title = this.searchStr;
    this.queryService.year = this.yearStr;
    this.moviesService.search(this.searchStr, null, this.yearStr).subscribe((res: any) => {
      this.searchRes = res.Search;
      this.loader = false;
      this.totalResults = res.totalResults;
    });
  }

}
