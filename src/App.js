// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, AppBar, Toolbar, Typography } from '@mui/material';
import Home from './components/Home';
import CreateFormPage from './components/CreateFormPage';
import FormsList from './components/FormsList'; 
import EditForm from './components/EditFormPage';


function App() {
  return (
    <Router>
      <Container>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'white' }}>
              Form Generator
            </Typography>
          </Toolbar>
        </AppBar>

        <div style={{ paddingTop: '80px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-form" element={<CreateFormPage />} />
            <Route path="/forms" element={<FormsList />} />
            <Route path="/editform/:formId" element={<EditForm />} />

          </Routes>
        </div>
      </Container>
    </Router>
  );
}

export default App;
