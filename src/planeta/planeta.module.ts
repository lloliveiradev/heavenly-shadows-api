import { Module } from '@nestjs/common';
import { PlanetaService } from './planeta.service';
import { PlanetaController } from './planeta.controller';

@Module({
  controllers: [PlanetaController],
  providers: [PlanetaService],
})
export class PlanetaModule {}
