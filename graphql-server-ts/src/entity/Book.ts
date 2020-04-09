import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from "typeorm";
import { ObjectType, Field, ID } from 'type-graphql';
import { Author } from "./Author";

@ObjectType()
@Entity()
export class Book extends BaseEntity {

    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    name: string;

    @Field(() => Author)
    @ManyToOne(() => Author)
    @JoinColumn({ name: "authorId" })
    author: Author;

    @Column("int", { nullable: false })
    authorId: number;


}