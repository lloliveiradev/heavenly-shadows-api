import { FirebaseService } from 'src/firebase/firebase.service';
export declare class PersonaService {
    private readonly firebaseService;
    private readonly collection;
    constructor(firebaseService: FirebaseService);
    findAll(options: any): Promise<any>;
    findOne(id: string): Promise<any>;
}
