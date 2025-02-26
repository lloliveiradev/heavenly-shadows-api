import { ContatoService } from './contato.service';
import { CreateContatoDto } from './dto/create-contato.dto';
export declare class ContatoController {
    private readonly contatoService;
    constructor(contatoService: ContatoService);
    create(data: CreateContatoDto): Promise<{
        rowid: string;
        message: string;
    }>;
}
