import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google';
import Home from './pages/Home'
import RoleSelection from './pages/RoleSelection'
import Login from './pages/Login'
import CoupleDashboard from './pages/CoupleDashboard';
import VendorDashboard from './pages/VendorDashboard';
import CouplePortal from './pages/CouplePortal';
import VendorPortal from './pages/VendorPortal';
import Onboarding from './pages/Onboarding';
import VendorOnboarding from './pages/VendorOnboarding';
import FindVendors from './pages/FindVendors';
import StartPlanning from './pages/StartPlanning';
import RegisterVendor from './pages/RegisterVendor';
import PricingCheckout from './pages/PricingCheckout';
import ExperienceDetails from './pages/ExperienceDetails';
import FullGallery from './pages/FullGallery';
import AppDownload from './pages/AppDownload';
import PrivateRoute from './components/PrivateRoute';
import './App.css'
const API = import.meta.env.VITE_API_URL;

function App() {
  const API = import.meta.env.VITE_API_URL;
  
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || '1234567890-mockclientid.apps.googleusercontent.com';
  
  return (
    <GoogleOAuthProvider clientId={clientId} API={API}>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/role-selection" element={<RoleSelection />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding" element={<Onboarding />} />
        <Route path="/vendor-onboarding" element={<VendorOnboarding />} />
        <Route path="/portal/couple" element={<CouplePortal />} />
        <Route path="/dashboard/couple" element={
          <PrivateRoute allowedRoles={['user', 'couple']}>
            <CoupleDashboard />
          </PrivateRoute>
        } />
        <Route path="/portal/vendor" element={<VendorPortal />} />
        <Route path="/dashboard/vendor" element={
          <PrivateRoute allowedRoles={['admin', 'vendor']}>
            <VendorDashboard />
          </PrivateRoute>
        } />
        <Route path="/find-vendors" element={<FindVendors />} />
        <Route path="/start-planning" element={<StartPlanning />} />
        <Route path="/register-vendor" element={<RegisterVendor />} />
        <Route path="/pricing-checkout" element={<PricingCheckout />} />
        <Route path="/experience" element={<ExperienceDetails />} />
        <Route path="/gallery" element={<FullGallery />} />
        <Route path="/mobile-app" element={<AppDownload />} />
      </Routes>
    </Router>
    </GoogleOAuthProvider>
  )
}

export default App
