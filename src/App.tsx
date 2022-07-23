import './App.css';
import LoginContainer from './app/components/Login/LoginContainer';
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
            <Route path='/account' element={<LoginContainer />}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
