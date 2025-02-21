import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PlanetaService } from './planeta.service';
import { CreatePlanetaDto } from './dto/create-planeta.dto';
import { UpdatePlanetaDto } from './dto/update-planeta.dto';

@Controller('planeta')
export class PlanetaController {
  constructor(private readonly planetaService: PlanetaService) {}

  // @Post()
  // create(@Body() createPlanetaDto: CreatePlanetaDto) {
  //   return this.planetaService.create(createPlanetaDto);
  // }

  @Post(':find')
  findAll(@Body() options: any) {
    return this.planetaService.findAll(options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planetaService.findOne(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePlanetaDto: UpdatePlanetaDto) {
  //   return this.planetaService.update(+id, updatePlanetaDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.planetaService.remove(+id);
  // }
}
