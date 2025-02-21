import { Injectable } from '@nestjs/common';
import { CreateContatoDto } from './dto/create-contato.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { webservice } from 'utils/webservice';

@Injectable()
export class ContatoService {
  private readonly collection: string;
  constructor(private readonly firebaseService: FirebaseService) {
    this.collection = 'contato';
  }

  async create(createContatoDto: CreateContatoDto) {
    const res = await this.firebaseService.createRecord(
      this.collection,
      createContatoDto,
      webservice,
    );
    return res;
  }
}
