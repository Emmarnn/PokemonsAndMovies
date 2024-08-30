import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';


import PokemonDetail from './pages/PokemonDetail'; // Assurez-vous d'importer le composant PokemonDetail

import MoviesPage from './pages/MoviesPage';
import MoviesDetailsPage from './pages/MoviesDetailsPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Ionic Dark Mode */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import PokemonList from './pages/PokemonList';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/pokemon-list">
            <PokemonList />
          </Route>
          <Route exact path="/pokemon-detail/:id">
            <PokemonDetail />
          </Route>
          <Route path="/movies">
            <MoviesPage />
          </Route>
          <Route path="/movies" component={MoviesPage} exact={true} />
        <Route exact path="/" render={() => <Redirect to="/movies" />} />

        <Route path="/" exact component={MoviesPage} />
      <Route path="/movie/:id" component={MoviesDetailsPage} />

        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="tab2" href="/pokemon-list">
            <IonIcon aria-hidden="true" icon={ellipse} />
            <IonLabel>Pokémons</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/movies">
            <IonIcon aria-hidden="true" icon={square} />
            <IonLabel>Movies</IonLabel>
          </IonTabButton>
          <Route path="/movies" component={MoviesPage} exact={true} />
 
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;