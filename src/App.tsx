import React from 'react';
import './App.css';
import { Grid } from 'semantic-ui-react';
import TopMenu from './components/TopMenu';
import { Switch, Route } from 'react-router-dom';
import ViewPosts from './components/ViewPosts';
function App() {

  return (
    <Grid padded='horizontally' columns='16' className='body'>
      <Grid.Row className='firstRow' >
        <TopMenu />
      </Grid.Row>

      <Grid.Row centered className='secondRow'>
        <Switch>
          <Route exact path='/'>
            <ViewPosts />
          </Route>
          <Route exact path='/post'>
            2adsfghj
          </Route>
          <Route exact path='/post/:id'>
            3
        </Route>
          <Route exact path='/admin'>
            4
        </Route>
          <Route exact path='/login'>
            1
        </Route>
          <Route exact path='/signup'>
            2
        </Route>
        </Switch>
      </Grid.Row>

    </Grid>
  );
}

export default App;
