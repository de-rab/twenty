import { Field } from '@nestjs/graphql';
import { ArgsType } from '@nestjs/graphql';
import { PipelineWhereUniqueInput } from './pipeline-where-unique.input';
import { Type } from 'class-transformer';

@ArgsType()
export class DeleteOnePipelineArgs {

    @Field(() => PipelineWhereUniqueInput, {nullable:false})
    @Type(() => PipelineWhereUniqueInput)
    where!: PipelineWhereUniqueInput;
}
