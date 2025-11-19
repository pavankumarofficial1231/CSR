import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { ProjectList } from './pages/ProjectList';
import { ProjectDetails } from './pages/ProjectDetails';
import { Login } from './pages/Login';
import { SubmitProposal } from './pages/SubmitProposal';
import { TrackStatus } from './pages/TrackStatus';
import { ImpactReports } from './pages/ImpactReports';
import { NotificationProvider } from './context/NotificationContext';

// Wrapper to handle scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  return (
    <NotificationProvider>
      <Router>
        <ScrollToTop />
        <div className="bg-[#0A1A2F] text-white min-h-screen flex flex-col font-sans selection:bg-csrOrange selection:text-white">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/dashboard" element={<Home />} />
              <Route path="/projects/:sectorId" element={<ProjectList />} />
              <Route path="/project/:projectId" element={<ProjectDetails />} />
              <Route path="/submit-proposal" element={<SubmitProposal />} />
              <Route path="/track-status" element={<TrackStatus />} />
              <Route path="/impact-reports" element={<ImpactReports />} />
            </Routes>
          </main>
          
          <footer className="border-t border-white/10 bg-[#050e1a] py-8 text-center text-gray-500 text-sm">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
              <p>© 2024 CSR Impact Platform. All rights reserved.</p>
              <div className="flex gap-4 mt-4 md:mt-0">
                <a href="#" className="hover:text-csrOrange">Privacy</a>
                <a href="#" className="hover:text-csrOrange">Terms</a>
                <a href="#" className="hover:text-csrOrange">Compliance</a>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </NotificationProvider>
  );
};

export default App;