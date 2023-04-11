import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/accounts/Login';
import Register from './components/accounts/Register';
import Home from './pages/Home';
import ForgotPassword from './components/accounts/ForgotPassword';
import AdminPanel from './components/admin side/AdminPanel';
import PrivateRoute from './utils/PrivateRoute';
import ResetPassword from './components/accounts/ResetPassword';
import ResortPage from './components/admin side/ResortPage';
import BookingPage from './components/admin side/BookingPage';
import AddResort from './components/admin side/AddResort';


function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path='/' exact Component={Home} />
            <Route path='/login' Component={Login} />
            <Route path='/forgot-password' Component={ForgotPassword} />
            <Route path='/reset-password' Component={ResetPassword} />
            <Route Component={Register} path='/register'/>
                
            <Route path='/admin-dashboard' element={<PrivateRoute/>}>
                <Route path='/admin-dashboard' element={<AdminPanel/>} />
            </Route>
            <Route path='/resorts' element={<ResortPage/>} />
            <Route path='/bookings' element={<BookingPage/>} />
            <Route path='/add-resort' element={<AddResort/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
