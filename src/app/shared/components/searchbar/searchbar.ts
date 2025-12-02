import { Component } from '@angular/core';

import { OnDestroy, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Subject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';


@Component({
  selector: 'app-searchbar',
  imports:[ReactiveFormsModule],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.css',
})
export class Searchbar implements OnInit, OnDestroy  {
 searchControl = new FormControl('');
  private destroy$ = new Subject<void>();

  ngOnInit(): void {
    // Optional: Listen to value changes with debounce
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // Wait 300ms after user stops typing
        distinctUntilChanged(), // Only emit when value actually changes
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        console.log('Search value changed:', value);
      });
  }

  onSearch(): void {
    const searchText = this.searchControl.value?.trim();
    if (searchText) {
      console.log('Search submitted:', searchText);
      // Call your search service here
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
