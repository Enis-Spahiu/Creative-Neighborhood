import './App.css';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Login from './components/Login';
import Register from './components/Register';
import NewDetail from './components/NewDetail';
import Main from './components/Main';
import AddEvent from './components/AddEvent';


function App() {


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Main/>}/>
          <Route path='/detail/:id' element={<NewDetail/>}/>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/add' element={<AddEvent/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
