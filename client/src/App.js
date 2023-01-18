import './App.css';
import Home from './components/Home';
import Detail from './components/Detail';
import Navbar from './components/Navbar';
import Form from './components/Form';
import LandingPage from './components/LandingPage';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      
      <Route exact path='/'>
        <LandingPage/>
      </Route>

      <Route exact path='/home'>
        <Navbar/>
        <Home />
      </Route>
      
      <Route exact path='/home/:id'>
        <Navbar/>
        <Detail/>
      </Route>
      
      <Route exact path='/form'>
        <Navbar/>
        <Form/>
      </Route>
       
    </div>
  );
}

export default App;
