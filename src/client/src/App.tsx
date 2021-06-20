import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from 'layout/Layout';
import { AddNote, Notes } from 'features/notes';
import { Snackbar } from 'features/snackbar';
import { Note } from 'features/notes';

// TODO: add route with 404 component
// TODO: export routes?

const App = () => {
  return (
    <div>
      <Snackbar />
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Notes} />
            <Route path="/create" component={AddNote} />
            <Route path="/note" component={Note} />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
