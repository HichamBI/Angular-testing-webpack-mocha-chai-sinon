import {Component} from '@angular/core';
import {Book} from './book.model';

@Component({
  selector: 'book-form',
  templateUrl: './book-form.component.html'
})
export class BookFormComponent {

  formTitle: String = 'Add New Book';
  submitted = false;
  model: any = new Book('', '');

  onSubmit() {
    this.submitted = true;
  }

  newBook() {
    this.model = new Book('', '');
  }
}

