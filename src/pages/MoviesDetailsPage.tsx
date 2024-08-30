import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonList,
  IonThumbnail,
  IonButton,
} from '@ionic/react';
import axios from 'axios';

const MovieDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); 
  const [movie, setMovie] = useState<any>(null);

  useEffect(() => {
    fetchMovieDetails(id);
  }, [id]);

  const fetchMovieDetails = async (movieId: string) => {
    try {
      const response = await axios.get(`http://movies-api.julienpoirier-webdev.com/infos/movies/${movieId}`);
      setMovie(response.data);
    } catch (error) {
      console.error('Error fetching movie details:', error);
    }
  };

  if (!movie) return <p>Loading...</p>;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>{movie.title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonCard>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img
              src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'assets/default-movie.png'}
              alt="Movie Poster"
              style={{ width: '100%', maxWidth: '500px', height: 'auto', borderRadius: '10px', }}
            />
          </div>
          <IonCardHeader>
            <IonCardTitle>{movie.title}</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <IonList>
              <IonItem>
                <IonLabel>Date de sortie:</IonLabel>
                <p>{movie.release_date ? new Date(movie.release_date).toLocaleDateString() : 'N/A'}</p>
              </IonItem>
              <IonItem>
                <IonLabel>Durée:</IonLabel>
                <p>{movie.runtime ? `${movie.runtime} minutes` : 'N/A'}</p>
              </IonItem>
              <IonItem>
                <p>{movie.overview || 'N/A'}</p>
              </IonItem>
              <IonItem>
                <IonLabel>Genres:</IonLabel>
                <p>{movie.genres?.map((genre: any) => genre.name).join(', ') || 'N/A'}</p>
              </IonItem>
              <IonItem>
                <IonLabel>Nom original:</IonLabel>
                <p>{movie.original_title || 'N/A'}</p>
              </IonItem>
              <IonItem>
                <IonLabel>Pays de production:</IonLabel>
                <p>{movie.production_countries?.map((country: any) => country.name).join(', ') || 'N/A'}</p>
              </IonItem>
              <IonItem>
                <IonLabel>Langues parlées:</IonLabel>
                <p>{movie.spoken_languages?.map((language: any) => language.name).join(', ') || 'N/A'}</p>
              </IonItem>
              <IonItem>
                <IonLabel>Tagline:</IonLabel>
                <p>{movie.tagline || 'N/A'}</p>
              </IonItem>
              <IonItem>
                <IonLabel>Budget:</IonLabel>
                <p>{movie.budget ? `$${movie.budget.toLocaleString()}` : 'N/A'}</p>
              </IonItem>
              <IonItem>
                <IonLabel>Collection:</IonLabel>
                <p>{movie.belongs_to_collection ? movie.belongs_to_collection.name : 'N/A'}</p>
              </IonItem>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
              <IonButton
                expand="block"
                style={{ width: '150px', margin: '0 10px' }}
                onClick={() => window.history.back()}
              >
                Retour
              </IonButton>
              </div>
            </IonList>
          </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
};

export default MovieDetailPage;
