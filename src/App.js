import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Users/components/Login';
import Signup from './Users/components/Signup';
import HomePage from './Users/pages/HomePage';
import Flight from './Flights/pages/Flights';
import FlightDetails from './Flights/components/FlightDetails';
import AddServiceProvider from './ServiceProvider/components/AddServiceProvider';
import ServiceProviderList from './ServiceProvider/components/EditServiceProvider';
import AirlinePage from './Airline/pages/Airline';
import CreateAirline from './Airline/components/CreateAirline';
import AddFlight from './Airline/components/AddFlight';
import { useCallback, useState } from 'react';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/Context/AuthContext';
import AirlineFlights from './Airline/pages/AirlineFlights';
import EditFlight from './Airline/components/EditFlight';
import BookingForm from './Booking/component/BookingForm';
import CustomerDashboard from './Users/pages/CustomerDashBoard';
import FlightUser from './Users/pages/Flight';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Define isLoggedIn state
    const [userId, setUserId] = useState(null); // Define userId state
    const [userRole, setUserRole] = useState(null); // Define userRole state

    const login = useCallback((uid, role) => { // Adjust login to accept a role
        setIsLoggedIn(true);
        setUserId(uid);
        setUserRole(role); // Set user role on login
    }, []);

    const logout = useCallback(() => {
        setIsLoggedIn(false);
        setUserId(null);
        setUserRole(null); // Reset user role on logout
    }, []);

    let routes;

    if (isLoggedIn) {
        routes = (
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/allflights" element={<Flight />} />
                <Route path="/flights/:flightId" element={<FlightDetails />} />
                <Route path="/bookticket/:flightId" element={<BookingForm />} /> {/* Route for booking page */}
                <Route path="/allflights-user" element={<FlightUser />} />
                
                {/* Service Provider Routes */}
                {userRole === 'serviceProvider' && (
                  <>
                      <Route path="/airlinepage" element={<AirlinePage />} />
                      <Route path="/createAirline" element={<CreateAirline />} />
                      <Route path="/airlineFlights/:airlineId" element={<AirlineFlights />} />
                      <Route path="/addFlight/:airlineId" element={<AddFlight />} />
                      <Route path="/editFlight/:flightId" element={<EditFlight />} />
                  </>
                )}

                {/* Admin Routes */}
                {userRole === 'admin' && (
                    <>
                        <Route path="/users/serviceproviders" element={<ServiceProviderList />} />
                        <Route path="/users/deleteserviceprovider/:id" element={<ServiceProviderList />} />
                        <Route path="/newsp" element={<AddServiceProvider />} />
                    </>
                )}

                {userRole === 'customer' && (
                    <Route path="/customer-dashboard" element={<CustomerDashboard />} />
                )}
            </Routes>
        );
    } else {
        routes = (
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
            </Routes>
        );
    }

    return (
        // Provide context for all components
        <AuthContext.Provider value={{ isLoggedIn, login, logout, userId, userRole }}>
            <Router>
                <MainNavigation />
                <main>
                    {routes}
                </main>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
