import { User } from './user.interface';

export interface SearchResponse {
  incomplete_results: boolean;
  items: User[];
  total_count: number;
}
