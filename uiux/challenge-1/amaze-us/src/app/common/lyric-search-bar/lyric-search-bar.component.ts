import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { distinctUntilChanged, debounceTime } from 'rxjs/operators';

import { MusixmatchService } from 'src/app/musixmatch.service';

@Component({
  selector: 'app-lyric-search-bar',
  templateUrl: './lyric-search-bar.component.html',
  styleUrls: ['./lyric-search-bar.component.scss']
})
export class LyricSearchBarComponent implements OnInit {

  searchLyricsForm: FormGroup;
  isSearching: boolean;

  constructor(private musixmatch: MusixmatchService, private fb: FormBuilder) { }

  ngOnInit() {
    // Defining reactive search form
    this.searchLyricsForm = this.fb.group({
      searchLyricsTerm: ''
    });

    // Auto search by typing
    this.searchLyricsForm.get('searchLyricsTerm').valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(term => this.musixmatch.search(term));

    // Is loading status
    this.musixmatch.isSearching(status => this.isSearching = status);
  }

  // Search by clicking on button
  search() {
    let term = (this.searchLyricsForm.get('searchLyricsTerm').value);
    this.musixmatch.search(term);
  }
}
