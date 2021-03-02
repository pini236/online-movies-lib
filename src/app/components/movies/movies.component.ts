import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  topRated: any;
  responsiveOptions;
  loader = true;
  totalResults: any;
  total_results: any;
  searchRes: any;
  searchStr: string ='tom';

  constructor(private moviesService: MoviesService) {
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

  }

  ngOnInit() {
    this.searchMovies();
  }

  changePage(event) {
    this.searchMovies(event.pageIndex + 1);
  }

  searchMovies(page: number = 1) {
    this.loader = true;
    this.moviesService.search(this.searchStr, page).subscribe((res: any) => {
      this.searchRes = res.Search;
      this.loader = false;
      this.totalResults = res.totalResults;
    });
  }

}
