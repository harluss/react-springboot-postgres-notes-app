import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from 'layout/Layout';
import { AddNote, Notes } from 'features/notes2';

// TODO: add route with 404 component

const App = () => {
  return (
    <div>
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
