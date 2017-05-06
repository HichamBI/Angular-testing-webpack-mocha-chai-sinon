import { ComponentFixture, getTestBed, TestBed } from "@angular/core/testing";
import { FormsModule } from "@angular/forms";
import { By } from "@angular/platform-browser";

import { BookFormComponent } from "../src/app/book-form.component";

import { expect } from "chai";
import { spy } from "sinon";

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
        })
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

        expect(logSpan.nativeElement.textContent).to.equal('');

        fixture.detectChanges();
        expect(logSpan.nativeElement.textContent).to.equal('Log : ');

        fixture.whenStable().then(() => {
            originalTitleInput.value = 'Harry Potter';
            originalTitleInput.dispatchEvent(newEvent('input'));

            expect(comp.model.originalTitle).to.equal('Harry Potter');

            fixture.detectChanges();
            expect(logSpan.nativeElement.textContent).to.equal('Log : Harry Potter');

            done();
        });
    });

    it('should call newBook function when submit button clicked', () => {
        fixture = TestBed.createComponent(BookFormComponent);
        comp = fixture.componentInstance;

        let submitButton = fixture.debugElement.query(By.css('#submit'));
        let onSubmitFunction = spy(comp, 'onSubmit');
        let newBookFunction = spy(comp, 'newBook');

        submitButton.triggerEventHandler('click', {});

        expect(onSubmitFunction.calledOnce).to.equal(false);
        expect(newBookFunction.calledOnce).to.equal(true);
    });

    it('should call onSubmit function when form submitted', () => {
        fixture = TestBed.createComponent(BookFormComponent);
        comp = fixture.componentInstance;

        let form = fixture.debugElement.query(By.css('form'));
        let onSubmitFunction = spy(comp, 'onSubmit');
        let newBookFunction = spy(comp, 'newBook');

        fixture.detectChanges();

        form.triggerEventHandler('submit', {});

        expect(onSubmitFunction.calledOnce).to.equal(true);
        expect(newBookFunction.calledOnce).to.equal(false);
    });
});