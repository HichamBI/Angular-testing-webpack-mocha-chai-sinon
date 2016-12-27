import {Injectable} from '@angular/core';
import {Book} from "./app.model";
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AppService {

    constructor(private http: Http) {
    }

    getBookList(): Promise<Book[]> {
        let allBooksUrl = `http://localhost:8080/book/all`;
        return this.http.get(allBooksUrl)
            .toPromise()
            .then(response => response.json() as Book[])
            .catch(AppService.handleError);
    }

    private static handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
}