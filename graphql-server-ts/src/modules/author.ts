import { Resolver, Query, Mutation, Arg } from "type-graphql";
import { Author } from "../entity/Author";


@Resolver(Author)
class AuthorResolver {
    @Query(() => Author)
    async getAuthor(@Arg("id") id: number): Promise<Author> {
        return (await Author.findByIds([id]))[0];
    }
    @Query(() => [Author])
    async getAuthors(@Arg("limit", { defaultValue: 0 }) limit?: number, @Arg("offset", { defaultValue: 0 }) offset?: number): Promise<Author[]> {
        return await Author.find({
            skip: offset,
            take: limit
        });;
    }
    @Mutation(() => Author)
    async addAuthor(@Arg("name") name: string): Promise<Author> {
        return await Author.create({ name }).save();;
    }
    @Mutation(() => Author)
    async editAuthor(@Arg("id") id: number, @Arg("name") name: string): Promise<Author> {
        let author: Author = (await Author.findByIds([id]))[0];
        author.name = name;
        return await Author.save(author);
    }
    @Mutation(() => Author)
    async removeAuthor(@Arg("id") id: number): Promise<Author> {
        let deletedAuthor: Author | undefined = await Author.findOne(id);
        await Author.delete(id);
        return <Author>deletedAuthor;
    }
}

export default AuthorResolver;