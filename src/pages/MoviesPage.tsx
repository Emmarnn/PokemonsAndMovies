import React, { useState, useEffect } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonRouterLink,
} from '@ionic/react';
import axios from 'axios';

const MoviesPage: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    searchMovies('');
  }, []);

  const searchMovies = async (query: string) => {
    try {
      const response = await axios.get(`http://movies-api.julienpoirier-webdev.com/search/movies/${query}`);
      setMovies(response.data.results || response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
      setMovies([]);
    }
  };

  const handleSearchChange = (event: CustomEvent) => {
    const query = event.detail.value;
    setSearchQuery(query);
    searchMovies(query);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color={'warning'}>
          <IonTitle>Liste des films</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            placeholder="Recherchez un film..."
            value={searchQuery}
            onIonInput={handleSearchChange}
          />
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonGrid>
          <IonRow>
            {Array.isArray(movies) && movies.map((movie, index) => (
              <IonCol size="12" size-md="6" size-lg="4" key={index}>
                <IonCard>
                  <IonRouterLink routerLink={`/movie/${movie.id}`}>
                    <img
                      src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'assets/default-movie.png'}
                      alt="Movie Poster"
                      style={{ width: '100%', height: 'auto', borderRadius: '10px' }}
                    />
                    <IonCardHeader>
                      <IonCardTitle>{movie.title}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <p>Date de sortie : {movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'N/A'}</p>
                      <p><i>{truncateText(movie.overview || movie.plot, 100)}</i></p>
                    </IonCardContent>
                  </IonRouterLink>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default MoviesPage;
