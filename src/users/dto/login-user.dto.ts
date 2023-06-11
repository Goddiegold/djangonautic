/* eslint-disable prettier/prettier */
import { IsString,Min} from 'class-validator';

export class LoginUserDto {
    @IsString()
    @Min(5)
    readonly email:string;

    @IsString()
    @Min(5)
    readonly password:string;
}
