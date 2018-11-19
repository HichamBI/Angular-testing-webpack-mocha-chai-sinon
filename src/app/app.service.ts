import {Injectable} from '@angular/core';
import {Book} from './book.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';

@Injectable()
export class AppService {

  constructor(private http: HttpClient) {
  }

  getBookList(): Observable<Book[]> {
    const allBooksUrl = `http://localhost:8080/book/all`;
    return this.http.get<Book[]>(allBooksUrl);
  }
}
