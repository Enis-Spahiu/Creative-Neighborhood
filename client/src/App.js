import './App.css';
import Form from './components/Form';
import Login from './components/Login';
import EventList from './components/EventList';
import {BrowserRouter, Routes,Route, Link} from 'react-router-dom' 
import Detail from './components/Detail';
import Register from './components/Register';
import LogReg from './views/LogReg';
import axios from 'axios';

function App() {

  const logout = ()=>{
    axios.post("http://localhost:8000/api/users/logout",{},{
      withCredentials:true
    })
      .then((res)=>{
        console.log(res.data);
      })
      .catch((err)=>{
        console.log(err)
      })
  }

  return (
    <div className="App">
      <button onClick={logout}>Logout</button>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LogReg/>}/>
          <Route path='/form' element={<Form/>}/>
          <Route path='/list' element={<EventList/>}/>
          <Route path='/list/:id' element={<Detail/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
