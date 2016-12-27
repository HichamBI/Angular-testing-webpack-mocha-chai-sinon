import { getTestBed, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule } from "@angular/http";
import { By } from '@angular/platform-browser';

import { expect  } from 'chai';
import  * as sinon  from 'sinon';

import { AppComponent } from "../src/app/app.component";
import { BookService } from "../src/app/book.service";

describe(`App Component Test`, () => {
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let server : any;

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
            declarations: [AppComponent],
            providers: [BookService],
        }).compileComponents();
    });

    afterEach(() => {
        server.restore();
        getTestBed().resetTestingModule();
    });

    it('should display a title', () => {
        fixture = TestBed.createComponent(AppComponent);
        let title : any;

        title = fixture.debugElement.query(By.css('h2'));
        expect(title.nativeElement.textContent).to.equal('');

        fixture.detectChanges();

        title = fixture.debugElement.query(By.css('h2'));
        expect(title.nativeElement.textContent).to.equal('Best Of Books');
    });

    it('should have a non empty book List', (done) => {
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;

        fixture.detectChanges();
        expect(comp.bookList.length).equal(0);

        fixture.whenStable().then(() => {
            fixture.detectChanges();

            expect(comp.bookList.length).equal(3);

            let bookTitle = fixture.debugElement.query(By.css('li span'));
            expect(bookTitle.nativeElement.textContent).to.equal('The Hunger Games');

            done();
        });
    });

    it('should display a empty message when empty book list', (done) => {
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;

        fixture.detectChanges();
        fixture.whenStable().then(() => {
            comp.bookList = []; // Empty Book List

            fixture.detectChanges();
            let bookTitle = fixture.debugElement.query(By.css('h4'));
            expect(bookTitle).to.be.null;

            let errorMessage = fixture.debugElement.query(By.css('span'));
            expect(errorMessage.nativeElement.textContent).to.equal('Book List is empty !');
            done();
        });
    });
});