import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from 'components/Layout/Layout';
import { AddNote, Notes } from 'features/Notes';

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
