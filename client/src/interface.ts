export interface Shelf {
  name: string;
  slug: string;
  total: number;
}

export interface Book {
  id: string;
  cover: string;
  title: string;
  author: string;
  rating: number;
  review: string;
  date_read: Date;
  date_added: Date;
}

export interface BookResponse {
  current_page: number;
  max_page: number;
  data: Book[];
}

export interface UserDetail {
  user_id: string;
  first_name: string;
  last_name: string;
}
