import React, { useEffect, useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonImg,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonSearchbar,
  useIonRouter,
} from '@ionic/react';
import ListSkeleton from '../components/ListSkeleton';
import { Pokemon } from '../types/interface';

const PokemonList: React.FC = () => {
  const [pokemonData, setPokemonData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const router = useIonRouter();

  useEffect(() => {
    fetch('https://tyradex.vercel.app/api/v1/pokemon')
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPokemonData(data);
        } else {
          setError("Données invalides reçues de l'API");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données:', error);
        setError('Erreur lors de la récupération des données');
        setLoading(false);
      });
  }, []);

  // Filtrer les Pokémon par type et par nom en temps réel
  const filteredPokemon = pokemonData
  .filter((pokemon) =>
  pokemon.pokedex_id !==0
)
    .filter((pokemon) =>
      selectedType ? pokemon.types?.some((type) => type.name === selectedType) : true
    )
    .filter((pokemon) =>
      searchTerm
        ? [pokemon.name.fr, pokemon.name.en, pokemon.name.jp]  // Inclure les noms en français, anglais et japonais
            .some((name) => name.toLowerCase().includes(searchTerm.toLowerCase())) 
            /*rechercher un pokemon par son id aussi
            || pokemon.pokedex_id.toString().includes(searchTerm)
            */
        : true
    );

  // Récupérer les types uniques
  const uniqueTypes = Array.from(
    new Set(pokemonData.flatMap((pokemon) => pokemon.types?.map((type) => type.name) || []))
  );

  if (loading) {
    return <ListSkeleton />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!pokemonData || pokemonData.length === 0) {
    return <div>Aucun Pokémon disponible</div>;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'primary'}>
          <IonTitle>Liste des Pokémons</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            <IonCol size="12">
              <IonSelect
                value={selectedType}
                placeholder="Sélectionnez un type"
                onIonChange={(e) => setSelectedType(e.detail.value)}
              >
                <IonSelectOption value="">Tous les types</IonSelectOption>
                {uniqueTypes.map((type) => (
                  <IonSelectOption key={type} value={type}>
                    {type}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonCol>
          </IonRow>

          <IonRow>
            <IonCol size="12">
              <IonSearchbar
                value={searchTerm}
                placeholder="Recherchez un pokémon par son nom"
                onIonInput={(e) => setSearchTerm(e.detail.value!)}
                debounce={200}
              />
            </IonCol>
          </IonRow>

          <IonRow>
            {filteredPokemon.map((pokemon) => (
              <IonCol size="12" size-md="6" size-lg="4" key={pokemon.pokedex_id}>
                <IonCard style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <IonCardHeader>
                    <IonCardTitle>
                      {pokemon.name.fr} (#{pokemon.pokedex_id})
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <IonImg
                      src={pokemon.sprites.regular}
                      alt={pokemon.name.fr}
                      style={{ width: '100px', height: '100px' }}
                    />
                    
                    {pokemon.types?.length ? (
                      pokemon.types.map((type) => (
                        <div
                          key={type.name}
                          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          <IonImg src={type.image} alt={type.name} style={{ width: '30px', marginRight: '8px' }} />
                          <span>{type.name}</span>
                        </div>
                      ))
                    ) : (
                      <div>Aucun type disponible</div>
                    )}
                    <IonButton
                      expand="full"
                      onClick={() => router.push(`/pokemon-detail/${pokemon.pokedex_id}`)}
                    >
                      Voir Pokémon
                    </IonButton>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default PokemonList;
