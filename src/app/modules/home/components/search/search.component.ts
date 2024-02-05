import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();
  @Output() onSearchEmpty: EventEmitter<void> = new EventEmitter<void>();

  searchRequest: string = '';

  searchUsers(): void {
    if (!this.searchRequest.trim().length) {
      return;
    }

    this.onSearch.emit(this.searchRequest);
  }

  checkIsSearchEmpty(): void {
    const searchRequest: string = this.searchRequest.trim().toLowerCase();

    if (searchRequest.length) {
      return;
    }

    this.onSearchEmpty.emit();
  }
}
