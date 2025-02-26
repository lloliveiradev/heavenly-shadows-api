import { CreateContatoDto } from './dto/create-contato.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
export declare class ContatoService {
    private readonly firebaseService;
    private readonly collection;
    constructor(firebaseService: FirebaseService);
    create(createContatoDto: CreateContatoDto): Promise<string>;
}
