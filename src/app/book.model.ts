export class Book {
    iSBN: number;
    originalTitle: string;
    author: string;
    publicationDate: Date;

    constructor(iSBN: number, originalTitle: string, author: string, publicationDate: Date) {
        this.iSBN = iSBN;
        this.originalTitle = originalTitle;
        this.author = author;
        this.publicationDate = publicationDate;
    }
}