import { PoesiaService } from './poesia.service';
export declare class PoesiaController {
    private readonly poesiaService;
    constructor(poesiaService: PoesiaService);
    findAll(options: any): Promise<any>;
    findOne(id: string): Promise<any>;
}
