import React, { useState, useEffect } from 'react';
import { Paper, Button, Typography,  Grid , Divider, Container } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

const FormsList = () => {
  const [forms, setForms] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/apii/get_all_forms/');
        const data = response.data;

        console.log('Data received:', data);

        if (Array.isArray(data)) {
          setForms(data);
        } else {
          console.error('Data received is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('An error occurred while fetching forms.');
      }
    };
    fetchData();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom style={{ color: '#1976D2', marginTop: '20px', marginBottom: '20px' }}>
        Forms List
      </Typography>
      {error ? (
        <Typography variant="body1" style={{ color: 'red' }}>{error}</Typography>
      ) : forms.length === 0 ? (
        <Typography variant="body1">No forms available.</Typography>
      ) : (
        <div>
          {forms.map((form, index) => (
            <div key={form.form_id} style={{ marginBottom: '20px' }}>
              <Paper elevation={3} style={{ padding: '20px', boxShadow: '0px 0px 10px 0px #888' }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h5" style={{ color: '#1976D2', marginBottom: '10px' }}>
                    {form.form_title}
                  </Typography>
                  {form.questions.length > 0 && (
                    <Grid container spacing={2}>
                      {/* Use Grid component to create a responsive layout */}
                      <Grid item xs={12}>
                        <Typography variant="subtitle1" style={{ color: '#555', fontWeight: 'bold' }}>
                          {form.questions[0].title ? form.questions[0].title : `Question (${form.questions[0].type})`}
                        </Typography>
                        <Typography variant="body1" style={{ marginBottom: '10px' }}>
                          {form.questions[0].question}
                        </Typography>
                        <Divider />
                      </Grid>
                    </Grid>
                  )}
                  <div style={{ marginTop: '10px' }}>
                    <Link to={`/editform/${form.form_id}`}>
                      <Button variant="outlined" color="primary">
                        Edit
                      </Button>
                    </Link>
                    <Link to={`/renderform/${form.form_id}`}>
                      <Button variant="outlined" color="secondary">
                        Publish
                      </Button>
                    </Link>
                    {form.questions.length > 0 && (
                      <Link to={`/responses/${form.form_id}`}>
                        <Button variant="outlined" color="secondary" style={{ marginLeft: '10px' }}>
                          Responses
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </Paper>
            </div>
          ))}
        </div>
      )}
    </Container>
  );
};

export default FormsList;