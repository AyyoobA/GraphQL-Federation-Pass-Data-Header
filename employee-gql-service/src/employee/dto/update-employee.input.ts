import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class updateEmployeeDTO {
    @Field()
    id: string
    @Field()
    firstName: string
    @Field({ nullable: true })
    lastName: string
    @Field({ nullable: true })
    designation: string
    @Field({ nullable: true })
    city: string
}