import { Component, OnInit } from "@angular/core";
import { Book } from "./app.model";
import { AppService } from "./app.service";

@Component({
    selector: 'app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    bookList: Book[] = [];
    title: string = 'Best Of Books';
    emptyMessage: string = 'Book List is empty !';

    constructor(private bookService: AppService) {
    }

    ngOnInit(): void {
        this.bookService.getBookList().then(books => this.bookList = books);
    }
}
