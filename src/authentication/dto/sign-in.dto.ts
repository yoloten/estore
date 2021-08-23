import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class SignInDTO {
    @IsEmail()
    email: string;

    @IsString()
    @IsNotEmpty()

    plainPassword: string
}