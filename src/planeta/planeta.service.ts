import { Injectable } from '@nestjs/common';
import { CreatePlanetaDto } from './dto/create-planeta.dto';
import { UpdatePlanetaDto } from './dto/update-planeta.dto';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class PlanetaService {
  private readonly collection = 'planetas';
  constructor(private readonly firebaseService: FirebaseService) {
    this.collection = 'planetas';
  }

  // create(createPlanetaDto: CreatePlanetaDto) {
  //   return 'This action adds a new planeta';
  // }

  async findAll(options: any) {
    const res = await this.firebaseService.getRecords(
      this.collection,
      null,
      options,
    );
    return res;
  }

  findOne(id: string) {
    const res = this.firebaseService.getRecords(this.collection, id, {});
    return res;
  }

  // update(id: number, updatePlanetaDto: UpdatePlanetaDto) {
  //   return `This action updates a #${id} planeta`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} planeta`;
  // }
}
