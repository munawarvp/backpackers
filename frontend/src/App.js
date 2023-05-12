import React from 'react';
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/accounts/Login';
import Register from './components/accounts/Register';
import Home from './pages/Home';
import ForgotPassword from './components/accounts/ForgotPassword';
import AdminPanel from './components/admin side/AdminPanel';
import PrivateRoute, { AdminPrivateRoute, StaffPrivateRoute } from './utils/PrivateRoute';
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
import RegisterWithPage from './pages/user side/RegisterWithPage';
import RegisterSuccess from './components/user side/register with us/RegisterSuccess';
import UpdateResort from './components/admin side/UpdateResort';
import UserResortPage from './pages/user side/UserResortPage';
import UserAdventurePage from './pages/user side/UserAdventurePage';
import UserDestinationPage from './pages/user side/UserDestinationPage';
import SingleResortPage from './pages/user side/SingleResortPage';
import SingleAdventurePage from './pages/user side/SingleAdventurePage';
import CheckoutPage from './pages/user side/CheckoutPage';
import AdminBookingPage from './pages/super admin/AdminBookingPage';
import ViewBookingPage from './pages/super admin/ViewBookingPage';
import BookingSuccessPage from './pages/user side/BookingSuccessPage';
import AdventureCheckoutPage from './pages/user side/AdventureCheckoutPage';
import AdventureBookingSuccess from './components/user side/booking checkout/AdventureBookingSuccess';
import AdventureBookingPage from './pages/super admin/AdventureBookingPage';
import StaffAdventureBookingPage from './components/admin side/StaffAdventureBookingPage';
import ResortBookingViewPage from './components/admin side/ResortBookingViewPage';
import AdventureBookingViewPage from './components/admin side/AdventureBookingViewPage';
import ResortViewPage from './components/admin side/ResortViewPage';
import AdminResortPage from './pages/super admin/AdminResortPage';
import ViewAdventurePage from './pages/super admin/ViewAdventurePage';
import ViewDestinationPage from './pages/super admin/ViewDestinationPage';
import SingleDestinationPage from './pages/user side/SingleDestinationPage';
import UserProfilePage from './pages/user side/UserProfilePage';
import CouponsPage from './pages/super admin/CouponsPage';
import PageNotFound from './pages/user side/PageNotFound';



function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='*' Component={PageNotFound} />
          <Route path='/' exact Component={Home} />
          <Route path='/login' Component={Login} />
          <Route path='/forgot-password' Component={ForgotPassword} />
          <Route path='/reset-password' Component={ResetPassword} />
          <Route path='/register' Component={Register} />
          <Route path='/register-with-us' element={<RegisterWithPage />} />
          <Route path='/register-success' element={<RegisterSuccess />} />
          <Route path='/resorts-list' element={<UserResortPage />} />
          <Route path='/adventure-list' element={<UserAdventurePage />} />
          <Route path='/destination-list' element={<UserDestinationPage />} />
          <Route path='/resort-details/:id' element={<SingleResortPage />} />
          <Route path='/adventure-details/:id' element={<SingleAdventurePage />} />
          <Route path='/destination-details/:id' element={<SingleDestinationPage />} />
          <Route path='/booking-checkout' element={<CheckoutPage />} />
          <Route path='/booking-success/:id' element={<BookingSuccessPage />} />
          <Route path='/adventure-checkout' element={<AdventureCheckoutPage />} />
          <Route path='/adventure-booking-success/:id' element={<AdventureBookingSuccess />} />
          <Route path='/user-profile/:user_name' element={<UserProfilePage />} />

          <Route path='/admin-dashboard' element={<PrivateRoute />}>
            <Route path='/admin-dashboard' element={<AdminPanel />} />
          </Route>

          {/* ***staff admin*** */}
          <Route path='/staff' element={<StaffPrivateRoute />}>
            <Route path='resorts' element={<ResortPage />} />
            <Route path='view-resort/:id' element={<ResortViewPage />} />
            <Route path='adventure' element={<AdventurePage />} />
            <Route path='destination' element={<DestinationPage />} />
            <Route path='bookings' element={<BookingPage />} />
            <Route path='adventure-bookings' element={<StaffAdventureBookingPage />} />
            <Route path='resort-booking-view/:id' element={<ResortBookingViewPage />} />
            <Route path='adventure-booking-view/:id' element={<AdventureBookingViewPage />} />
            <Route path='add-resort' element={<AddResort />} />
            <Route path='update-resort/:id' element={<UpdateResort />} />
          </Route>



          <Route path='/admin' element={<AdminPrivateRoute />}>
            <Route path='resorts' element={<SuperAllResorts />} />
            <Route path='pendings' element={<ResortsPending />} />
            <Route path='manage-staff' element={<ManageStaff />} />
            <Route path='adventures' element={<AdminAdventure />} />
            <Route path='destinations' element={<AdminDestination />} />
            <Route path='bookings' element={<AdminBookingPage />} />
            <Route path='adventure-bookings' element={<AdventureBookingPage />} />
            <Route path='view-booking' element={<ViewBookingPage />} />
            <Route path='view-resort/:id' element={<AdminResortPage />} />
            <Route path='view-adventure/:id' element={<ViewAdventurePage />} />
            <Route path='view-destination/:id' element={<ViewDestinationPage />} />
            <Route path='coupons' element={<CouponsPage />} />
          </Route>


          {/* ***super admin*** */}

        </Routes>
      </Router>
    </div>
  );
}

export default App;
