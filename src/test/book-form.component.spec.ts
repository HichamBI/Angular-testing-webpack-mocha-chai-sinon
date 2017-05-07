import { ComponentFixture, getTestBed, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";
import { expect } from "chai";
import { BookFormComponent } from "../app/book-form.component";

let chai = require('chai') , spies = require('chai-spies');
chai.use(spies);

function newEvent(eventName: string, bubbles = false, cancelable = false) {
    let evt = document.createEvent('CustomEvent');  // MUST be 'CustomEvent'
    evt.initCustomEvent(eventName, bubbles, cancelable, null);
    return evt;
}

describe(`Book Form Component`, () => {
    let comp: BookFormComponent;
    let fixture: ComponentFixture<BookFormComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule],
            declarations: [BookFormComponent],
        }).compileComponents();
    });

    afterEach(() => {
        getTestBed().resetTestingModule();
    });

    it('should display a title', () => {
        fixture = TestBed.createComponent(BookFormComponent);
        let title: any;

        title = fixture.debugElement.query(By.css('h1'));
        expect(title.nativeElement.textContent).to.equal('');

        fixture.detectChanges();

        title = fixture.debugElement.query(By.css('h1'));
        expect(title.nativeElement.textContent).to.equal('Add New Book');
    });

    it('should log book title', (done) => {
        fixture = TestBed.createComponent(BookFormComponent);
        comp = fixture.componentInstance;

        let originalTitleInput = fixture.debugElement.query(By.css('#originalTitle')).nativeElement;
        let logSpan = fixture.debugElement.query(By.css('span'));

        fixture.detectChanges();
        expect(logSpan.nativeElement.textContent).to.equal('Log : ');

        fixture.whenStable().then(() => {
            originalTitleInput.value = 'Harry Potter';
            originalTitleInput.dispatchEvent(newEvent('input'));
            fixture.detectChanges();

            expect(comp.model.originalTitle).to.equal('Harry Potter');
            expect(logSpan.nativeElement.textContent).to.equal('Log : Harry Potter');

            done();
        });
    });

    it('should call newBook function when submit button clicked', () => {
        fixture = TestBed.createComponent(BookFormComponent);
        comp = fixture.componentInstance;

        let submitButton = fixture.debugElement.query(By.css('#submit'));
        let newBookFunction = chai.spy.on(comp, 'newBook');
        let onSubmitFunction = chai.spy.on(comp, 'onSubmit');

        submitButton.triggerEventHandler('click', {});

        expect(newBookFunction).to.have.been.called();
        expect(onSubmitFunction).to.not.have.been.called();

    });

    it('should call onSubmit function when form submitted', () => {
        fixture = TestBed.createComponent(BookFormComponent);
        comp = fixture.componentInstance;

        let form = fixture.debugElement.query(By.css('form'));
        let onSubmitFunction = chai.spy.on(comp, 'onSubmit');
        let newBookFunction = chai.spy.on(comp, 'newBook');


        form.triggerEventHandler('submit', {});

        expect(newBookFunction).to.not.have.been.called();
        expect(onSubmitFunction).to.have.been.called();
    });
});