import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from 'layout/Layout';
import { AddNote, EditNote, Note, Notes } from 'features/notes';
import { Snackbar } from 'features/snackbar';
import { Paths } from 'types';

// TODO: add route with 404 component

const App = () => {
  return (
    <div>
      <Snackbar />
      <Router>
        <Layout>
          <Switch>
            <Route exact path={Paths.notes} component={Notes} />
            <Route path={Paths.addNote} component={AddNote} />
            <Route path={Paths.viewNote} component={Note} />
            <Route path={Paths.editNote} component={EditNote} />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
};

export default App;
