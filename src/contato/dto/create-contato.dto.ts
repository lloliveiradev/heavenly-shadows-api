import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContatoDto {
  @ApiProperty({ description: 'E-mail do contato' })
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @ApiProperty({ description: 'Mensagem de contato' })
  @IsNotEmpty()
  @IsString()
  @Length(10)
  readonly message: string;

  @ApiProperty({ description: 'Nome do remetente' })
  @IsNotEmpty()
  @IsString()
  @Length(3)
  readonly name: string;

  @ApiProperty({ description: 'Assunto da mensagem' })
  @IsNotEmpty()
  @IsString()
  @Length(1)
  readonly subject: string;

  get() {
    return {
      email: this.email,
      message: this.message,
      name: this.name,
      subject: this.subject,
    };
  }
}
