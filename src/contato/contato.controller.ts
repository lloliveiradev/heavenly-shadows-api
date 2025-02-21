import { Controller, Post, Body } from '@nestjs/common';
import { ContatoService } from './contato.service';
import { CreateContatoDto } from './dto/create-contato.dto';

@Controller('contato')
export class ContatoController {
  constructor(private readonly contatoService: ContatoService) {}

  @Post()
  async create(@Body() data: CreateContatoDto) {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    const response = await this.contatoService.create(data);
    return { rowid: response, message: 'Registro inserido com sucesso.' };
  }
}
