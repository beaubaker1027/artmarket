import { Component, OnInit }  from '@angular/core';

import {
  Observable,
  Subject,
  of
}                             from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap
}                             from 'rxjs/operators';

//modules
import { SearchService }     from './services/search/search.service';


@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  search: any;
  users: Observable<Array<object>>;
  private searchTerm = new Subject<string>();

  constructor(
    private searchService: SearchService
  ) { }

  searchProfiles(query): void{
    this.searchTerm.next(query);
  }

  clearSearch(): void{
    this.search = document.getElementById('search');
    this.search.value = '';
    this.search.innerHtml = '';
    this.searchProfiles('');
  }

  ngOnInit(): void {
    this.users = this.searchTerm.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((query: string) =>
        this.searchService.searchProfiles(query))
    );
  }

}
