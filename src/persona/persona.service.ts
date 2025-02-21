import { Injectable } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class PersonaService {
  private readonly collection = 'personas';
  constructor(private readonly firebaseService: FirebaseService) {
    this.collection = 'personas';
  }

  // create(createPersonaDto: CreatePersonaDto) {
  //   return 'This action adds a new persona';
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

  // update(id: string, updatePersonaDto: UpdatePersonaDto) {
  //   return `This action updates a #${id} persona`;
  // }

  // remove(id: string) {
  //   return `This action removes a #${id} persona`;
  // }
}
