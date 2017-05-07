import { getTestBed, TestBed } from '@angular/core/testing';
import { HttpModule } from "@angular/http";

import { expect } from 'chai';
import  * as sinon  from 'sinon';
import { AppService } from "../app/app.service";


describe(`Book Service`, () => {
    let server: any;

    beforeEach(() => {
        server = sinon.fakeServer.create();
        server.autoRespond = true;
        server.respondWith("GET",
            "http://localhost:8080/book/all",
            [202,
                {"Content-Type": "application/json"},
                '[' +
                '{"originalTitle" :"The Hunger Games", "author" : "Suzanne Collins"},' +
                '{"originalTitle" :"Pride and Prejudice", "author" : "Jane Austen"},' +
                '{"originalTitle" :"The Chronicles of Narnia", "author" : "C.S. Lewis"}' +
                ']'
            ]
        );

        TestBed.configureTestingModule({
            imports: [HttpModule],
            providers: [AppService],
        }).compileComponents();
    });

    afterEach(() => {
        server.restore();
        getTestBed().resetTestingModule();
    });

    it('should return a list of Book', (done) => {
        let bookService: AppService = getTestBed().get(AppService);
        bookService.getBookList().then((books) => {
                expect(books.length).equal(3);

                let authors: string[] = books.map((book) => book.author);
                expect(authors).deep.equal(['Suzanne Collins', 'Jane Austen', 'C.S. Lewis']);

                done()
            }
        );
    });
});