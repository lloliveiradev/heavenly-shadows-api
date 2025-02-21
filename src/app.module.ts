import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirebaseModule } from './firebase/firebase.module';
import { PersonaModule } from './persona/persona.module';
import { PoesiaModule } from './poesia/poesia.module';
import { ContatoModule } from './contato/contato.module';
import { PlanetaModule } from './planeta/planeta.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    FirebaseModule.forRoot(),
    PersonaModule,
    PoesiaModule,
    ContatoModule,
    PlanetaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
