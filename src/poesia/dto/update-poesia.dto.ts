import { PartialType } from '@nestjs/mapped-types';
import { CreatePoesiaDto } from './create-poesia.dto';

export class UpdatePoesiaDto extends PartialType(CreatePoesiaDto) {}
