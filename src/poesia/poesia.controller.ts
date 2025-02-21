import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PoesiaService } from './poesia.service';
import { CreatePoesiaDto } from './dto/create-poesia.dto';
import { UpdatePoesiaDto } from './dto/update-poesia.dto';

@Controller('poesia')
export class PoesiaController {
  constructor(private readonly poesiaService: PoesiaService) {}

  // @Post()
  // create(@Body() createPoesiaDto: CreatePoesiaDto) {
  //   return this.poesiaService.create(createPoesiaDto);
  // }

  @Post(':find')
  findAll(@Body() options: any) {
    return this.poesiaService.findAll(options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.poesiaService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePoesiaDto: UpdatePoesiaDto) {
  //   return this.poesiaService.update(+id, updatePoesiaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.poesiaService.remove(+id);
  // }
}
