import './App.css';
import LoginContainer from './app/components/Login/LoginContainer';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Account from './pages/account/account';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/account' element={<Account/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
