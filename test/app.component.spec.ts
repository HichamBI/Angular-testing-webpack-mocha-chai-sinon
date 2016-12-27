import { getTestBed, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { assert } from 'chai';

import { HttpModule } from "@angular/http";
import  * as sinon  from 'sinon';
import { AppComponent } from "../src/app/app.component";
import { BookService } from "../src/app/book.service";


describe(`Dashboard Component Test`, () => {
    let comp: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let server = sinon.fakeServer.create();

    before(() => {
        server.respondWith("GET", "http://localhost:8080/book/all", [202, {"Content-Type": "application/json"}, '[{"iSBN": 1, "originalTitle" :"M Super Original Title", "author" : "author", "publicationDate" : "2000-10-10"}]']);
        server.autoRespond = true;
    });

    after(() => {
        server.restore();
    });

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpModule],
            declarations: [AppComponent],
            providers: [BookService],
        }).compileComponents();
    });

    afterEach(() => {
        getTestBed().resetTestingModule();
    });

    it('should display a title', () => {
        fixture = TestBed.createComponent(AppComponent);

        fixture.detectChanges();
        let title = fixture.debugElement.query(By.css('h2'));
        assert.equal(title.nativeElement.textContent, 'Top Books', 'should display "Top Books" as title');
    });

    it('should have a non empty book List', (done) => {
        fixture = TestBed.createComponent(AppComponent);
        comp = fixture.componentInstance;

        fixture.detectChanges();

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            let title = fixture.debugElement.query(By.css('h4'));
            assert.equal(title.nativeElement.textContent, 'My Super Original Title', "Incorrect Book title");
            done();
        });
    });
});