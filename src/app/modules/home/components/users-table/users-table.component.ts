import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersTableComponent {
  @Input() users: User[] = [];

  userTableColumns: string[] = ['id', 'login', 'type'];
}
