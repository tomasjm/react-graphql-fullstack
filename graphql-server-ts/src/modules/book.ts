import { Resolver, Query, FieldResolver, Root, Mutation, Arg, Subscription, PubSub, PubSubEngine } from "type-graphql";
import { Book } from "../entity/Book";
import { Author } from "../entity/Author";

@Resolver(Book)
class BookResolver {
    @Query(() => [Book])
    async getBooks(@Arg("limit", { defaultValue: 0 }) limit?: number, @Arg("offset", { defaultValue: 0 }) offset?: number): Promise<Book[]> {
        return await Book.find({
            skip: offset,
            take: limit
        });
    }
    @Query(() => Book)
    async getBook(@Arg("id") id: number): Promise<Book> {
        return (await Book.findByIds([id]))[0];
    }
    @Mutation(() => Book)
    async addBook(@Arg("name") name: string, @Arg("authorId") authorId: number, @PubSub() pubSub: PubSubEngine) {
        let newBook: Book = await Book.create({
            name,
            authorId
        }).save();
        await pubSub.publish("BOOK_ADDED", newBook);
        return newBook;
    }
    @Mutation(() => Book)
    async removeBook(@Arg("id") id: number): Promise<Book> {
        let removedBook: Book | undefined = await Book.findOne(id);
        await Book.delete(id);
        return <Book>removedBook;
    }
    @Mutation(() => Book)
    async editBook(@Arg("id") id: number, @Arg("name") name: string): Promise<Book> {
        let book: Book = <Book>(await Book.findOne(id));
        book.name = name;
        return await book.save();
    }
    @FieldResolver()
    async author(@Root() book: Book): Promise<Author> {
        return (await Author.find({ where: { id: book.authorId } }))[0];
    }
    @Subscription({
        topics: "BOOK_ADDED"
    })
    onNewBook(@Root() book: Book, ): Book {
        return book;
    }
}


export default BookResolver;