import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CreateFormPage from './CreateFormPage';


const EditForm = () => {
  const { formId } = useParams();
  const [formData, setFormData] = useState({
    form_id: '',
    form_title: '',
    questions: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/apii/get_form/${formId}`);
        const data = response.data;

        console.log('Form Data:', data);

        setFormData(data);
      } catch (error) {
        console.error('Error fetching form data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [formId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <CreateFormPage
      editMode
      initialFormData={formData} // Pass the entire form data, including questions
    />
  );
};

export default EditForm;
