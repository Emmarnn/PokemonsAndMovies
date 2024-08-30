export interface PokemonType {
	name: string;
	image: string;
  }
  

  export interface PokemonStats {
	hp: number ;
	atk: number;
	def: number;
	spe_atk: number;
	spe_def: number;
	vit: number;
  }
  
  export interface Evolution {
	pokedex_id: number;
	name: string;
	condition: string;
  }
  
  export interface Resistance {
	name: string;
	multiplier: number;
  }
  
  export interface Talents {
	name: string;
	tc: boolean;
  }
  
  export interface Pokemon {
	pokedex_id: number;
	generation: number;
	category: string;
	name: {
	  fr: string;
	  en: string;
	  jp: string;
	};
	sprites: {
	  regular: string;
	  shiny: string | null;
	  gmax: string | null;
	};
	types: PokemonType[];
	stats: PokemonStats;
	talents: Talents[];
	resistances: Resistance[];
	evolution: {
	  pre: Evolution[] | null;
	  next: Evolution[] | null;
	} | null;
	height: string | null;
	weight: string | null;
  }