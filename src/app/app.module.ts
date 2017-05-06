import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppService } from "./app.service";
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";
import { BookFormComponent } from "./book-form.component";

@NgModule({
    imports: [
        BrowserModule, HttpModule, FormsModule
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
