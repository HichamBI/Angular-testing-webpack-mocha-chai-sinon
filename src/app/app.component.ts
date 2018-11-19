import {Component, OnInit} from '@angular/core';
import {AppService} from './app.service';
import {Book} from './book.model';

@Component({
  selector: 'app',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  bookList: Book[] = [];
  title = 'Best Of Books';
  emptyMessage = 'Book List is empty !';

  constructor(private bookService: AppService) {
  }

  ngOnInit(): void {
    this.bookService.getBookList().subscribe(books => this.bookList = books);
  }
}
