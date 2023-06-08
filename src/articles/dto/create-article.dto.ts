/* eslint-disable prettier/prettier */
import { IsString,Min} from 'class-validator';
export class CreateArticleDto {
    @IsString()
    @Min(5)
    readonly title:string;

    @IsString()
    @Min(5)
    readonly body:string;
}
