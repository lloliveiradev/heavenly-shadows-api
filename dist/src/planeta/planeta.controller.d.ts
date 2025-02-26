import { PlanetaService } from './planeta.service';
export declare class PlanetaController {
    private readonly planetaService;
    constructor(planetaService: PlanetaService);
    findAll(options: any): Promise<any>;
    findOne(id: string): Promise<any>;
}
