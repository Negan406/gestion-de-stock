import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import DashboardPage from './pages/DashboardPage';
import AddProductPage from './pages/AddProductPage';
import InventoryPage from './pages/InventoryPage';
import AnalyticsPage from './pages/AnalyticsPage';
import ClientsPage from './pages/ClientsPage';
import SuppliersPage from './pages/SuppliersPage';
import OnlineUsersPage from './pages/OnlineUsersPage';
import LoginPage from './pages/LoginPage';
import { RouteProvider } from './context/RouteContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [isSidebarActive, setSidebarActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authStatus);
  }, []);
  const toggleSidebar = () => setSidebarActive(!isSidebarActive);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (window.innerWidth <= 991) {
        const sidebar = document.querySelector('.sidebar');
        const hamburger = document.querySelector('.hamburger');
        if (sidebar && !sidebar.contains(e.target) && hamburger && !hamburger.contains(e.target)) {
          setSidebarActive(false);
        }
      }
    };
    const handleResize = () => {
      if (window.innerWidth > 991) setSidebarActive(false);
    };
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('resize', handleResize);
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <RouteProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
          <Route
            path="/*"
            element={
              isAuthenticated ? (
                <div className={`app ${isSidebarActive ? 'sidebar-active' : ''}`}>
                  <button className="hamburger btn btn-primary" onClick={toggleSidebar}>
                  ☰
                  </button>
                  <Sidebar isActive={isSidebarActive} toggleSidebar={toggleSidebar} />
                  <main className="main-content container my-5">
                    <Routes>
                      <Route path="/dashboard" element={<DashboardPage />} />
                      <Route path="/add-product" element={<AddProductPage />} />
                      <Route path="/inventory" element={<InventoryPage />} />
                      <Route path="/analytics" element={<AnalyticsPage />} />
                      <Route path="/clients" element={<ClientsPage />} />
                      <Route path="/suppliers" element={<SuppliersPage />} />
                      <Route path="/settings" element={<div>Settings Page (TBD)</div>} />
                      <Route path="/users" element={<OnlineUsersPage />} />
                      <Route path="*" element={<Navigate to="/dashboard" />} />
                    </Routes>
                  </main>
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Router>
    </RouteProvider>
  );
}

export default App;
