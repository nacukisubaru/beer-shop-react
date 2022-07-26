import './App.css';
import LoginContainer from './app/components/Login/LoginContainer';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Account from './pages/account/account';
import Products from './pages/products/products';
import Beers from './pages/products/beers';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/account' element={<Account/>}/>
            <Route path='/products/beers' element={<Beers/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
