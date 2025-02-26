import { PersonaService } from './persona.service';
export declare class PersonaController {
    private readonly personaService;
    constructor(personaService: PersonaService);
    findAll(options: any): Promise<any>;
    findOne(id: string): Promise<any>;
}
