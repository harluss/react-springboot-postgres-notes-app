import { Route, Switch } from 'react-router-dom';
import { Layout } from 'layout';
import { AddNote, EditNote, Note, Notes } from 'features/notes';
import { Snackbar } from 'features/snackbar';
import { Paths } from 'types';
import { Message } from 'components/message';
import { MESSAGE_ROUTE_404 } from 'constants/const';

const App = () => {
  return (
    <div>
      <Snackbar />
      <Layout>
        <Switch>
          <Route exact path={Paths.notes} component={Notes} />
          <Route path={Paths.addNote} component={AddNote} />
          <Route path={Paths.viewNote} component={Note} />
          <Route path={Paths.editNote} component={EditNote} />
          <Route render={() => <Message messageText={MESSAGE_ROUTE_404} type="error" />} />
        </Switch>
      </Layout>
    </div>
  );
};

export default App;
