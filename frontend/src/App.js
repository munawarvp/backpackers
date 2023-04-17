import React from 'react';
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
import SuperAllResorts from './pages/super admin/SuperAllResorts';
import ResortsPending from './pages/super admin/ResortPending';
import ManageStaff from './pages/super admin/ManageStaff';
import AdventurePage from './components/admin side/AdventurePage';
import DestinationPage from './components/admin side/DestinationPage';
import AdminAdventure from './pages/super admin/AdminAdventure';
import AdminDestination from './pages/super admin/AdminDestination';


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

            {/* ***staff admin*** */}
            <Route path='/staff/resorts' element={<ResortPage/>} />
            <Route path='/staff/adventure' element={<AdventurePage/>} />
            <Route path='/staff/destination' element={<DestinationPage/>} />
            <Route path='/bookings' element={<BookingPage/>} />
            <Route path='/add-resort' element={<AddResort/>} />

            {/* ***super admin*** */}
            <Route path='/admin/resorts' element={<SuperAllResorts/>} />
            <Route path='/admin/pendings' element={<ResortsPending/>} />
            <Route path='/admin/manage-staff' element={<ManageStaff/>} />
            <Route path='/admin/adventures' element={<AdminAdventure/>} />
            <Route path='/admin/destinations' element={<AdminDestination/>} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;
