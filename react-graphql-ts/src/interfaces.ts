export interface IAuthor {
    id?: number;
    name?: string;
}
export interface IBook {
    id?: number;
    name?: string;
    author?: IAuthor;
}
export interface IBookContainer {
    books: IBook[]
}

export interface IAuthorContainer {
    authors: IAuthor[]
}
