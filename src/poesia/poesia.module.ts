import { Module } from '@nestjs/common';
import { PoesiaService } from './poesia.service';
import { PoesiaController } from './poesia.controller';

@Module({
  controllers: [PoesiaController],
  providers: [PoesiaService],
})
export class PoesiaModule {}
