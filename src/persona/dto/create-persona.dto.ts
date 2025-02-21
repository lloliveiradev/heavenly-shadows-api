export class CreatePersonaDto {
  readonly audio?: string;
  readonly bio: string;
  readonly convite: string;
  readonly cores: {
    readonly primaria: string;
    readonly secundaria: string;
    readonly terciaria: string;
  };
  readonly descricao: string;
  readonly gif?: string;
  readonly icon: string;
  readonly img: string;
  readonly subtitulo: string;
  readonly titulo: string;
}
