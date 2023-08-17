export interface NewPokemonType {
  name?: string;
  type?: string;
  height?: string;
  weight?: string;
  id?: string;
  image?: string;
}

export interface AddPokemonType {
  name: string;
  type: string;
  height: string;
  weight: string;
  image?: File;
}
