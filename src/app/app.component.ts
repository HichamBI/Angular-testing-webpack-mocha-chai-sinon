import { Component, OnInit, Input } from "@angular/core";
import { Book } from "./book.model";
import { BookService } from "./book.service";

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    @Input() bookList: Book[] = [];
    @Input() title: string = 'Top Books';

    constructor(private bookService: BookService) {
    }

    ngOnInit(): void {
        this.bookService.getBookList().then(books => this.bookList = books.slice(0, 3));
    }
}
