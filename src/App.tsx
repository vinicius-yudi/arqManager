import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetails from './pages/ProjectDetails';
import NewProject from './pages/NewProject';
import EditProject from './pages/EditProject';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="projects/new" element={<NewProject />} />
          <Route path="projects/:id" element={<ProjectDetails />} />
          <Route path="projects/:id/edit" element={<EditProject />} />
          <Route path="tasks" element={<p className="text-center py-12 text-gray-500">Página de Tarefas em desenvolvimento</p>} />
          <Route path="team" element={<p className="text-center py-12 text-gray-500">Página de Equipe em desenvolvimento</p>} />
          <Route path="reports" element={<p className="text-center py-12 text-gray-500">Página de Relatórios em desenvolvimento</p>} />
          <Route path="settings" element={<p className="text-center py-12 text-gray-500">Página de Configurações em desenvolvimento</p>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;