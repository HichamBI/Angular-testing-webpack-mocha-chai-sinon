import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {BookFormComponent} from './book-form.component';
import {AppService} from './app.service';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    BrowserModule, HttpClientModule, FormsModule
  ],
  declarations: [
    AppComponent,
    BookFormComponent
  ],
  bootstrap: [AppComponent],
  providers: [AppService]
})
export class AppModule {
}
