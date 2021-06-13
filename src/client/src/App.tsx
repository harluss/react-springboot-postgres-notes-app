import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from 'layout/Layout';
import { AddNote, Notes } from 'features/notes';
import { Snackbar } from 'features/snackbar';
import { AlertDialog } from 'features/alertDialog';

// TODO: add route with 404 component

const App = () => {
  return (
    <div>
      <Snackbar />
      <AlertDialog />
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/" component={Notes} />
            <Route path="/create" component={AddNote} />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
