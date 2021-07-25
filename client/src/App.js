import './App.css';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import HomePage from './pages/HomePage';
import { TodoContextProvider } from './context/todoContext';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import AuthProtected from './utils/AuthProtected';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <TodoContextProvider>
      <Router>
        <Switch>
          <AuthProtected exact path="/" component={HomePage}/>
          <Route path="/register" component={RegisterPage}/>
          <Route path="/login" component={LoginPage}/>
          <Route exact path="*" component={NotFoundPage}/>
        </Switch>
      </Router>
    </TodoContextProvider>
  );
}

export default App;
