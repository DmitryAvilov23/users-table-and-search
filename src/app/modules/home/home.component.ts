import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject, debounceTime, takeUntil } from 'rxjs';

import { User } from 'src/app/shared/interfaces/user.interface';
import { UsersService } from 'src/app/shared/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [UsersService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit, OnDestroy {
  users: User[] = [];

  searchRequest: string = '';

  private _onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private _usersService: UsersService,
    private _changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getActualUsers();
  }

  // Search Actual Users
  searchUsers(event: string) {
    this.changeSearchRequest(event);

    this._usersService
      .searchUsers(this.searchRequest)
      .pipe(debounceTime(300), takeUntil(this._onDestroy$))
      .subscribe({
        next: (users: User[]) => {
          this.users = users;

          this._changeDetector.markForCheck();
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  // Refresh Users
  refreshUsers(): void {
    if (this.searchRequest.length) {
      this.searchUsers(this.searchRequest);

      return;
    }

    this.getActualUsers();
  }

  //Change search request
  changeSearchRequest(request: string = '') {
    this.searchRequest = request;
  }

  // Get All Users
  private getActualUsers() {
    this._usersService
      .getUsers()
      .pipe(takeUntil(this._onDestroy$))
      .subscribe({
        next: (users: User[]) => {
          this.users = users;

          this._changeDetector.markForCheck();
        },
        error: (err) => {
          console.error(err);
        },
      });
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }
}
