import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../interfaces/user.interface';
import { SearchResponse } from '../interfaces/search.interface';

@Injectable()
export class UsersService {
  url = environment.serverUrl;

  constructor(private _httpClient: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this._httpClient.get<User[]>(`${this.url}/users`);
  }

  searchUsers(searchRequest: string): Observable<User[]> {
    return this._httpClient
      .get<SearchResponse>(`${this.url}/search/users?q=${searchRequest}`)
      .pipe(map((response: SearchResponse) => response.items));
  }
}
