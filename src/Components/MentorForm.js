import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';

function MentorForm() {
  const initialValues = {
    name: '',
    email: '',
    course: '',
  };

  const onSubmit = async (values, { resetForm }) => {
    try {
      const postedMentor = await axios.post(`https://mentor-and-student-be.onrender.com/Mentors`, values);
      // Update state or perform other actions with the response
      console.log('Posted mentor:', postedMentor.data);
      resetForm();
    } catch (error) {
      // Handle the error (e.g., log it to the console)
      console.error('Error posting mentor:', error);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2 className="text-info">Mentor Form</h2>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Mentor Name<span style={{ color: 'red' }}>*</span>
        </label>
        <div className="d-flex">
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.name && formik.errors.name && <div style={{ color: 'red' }}>{formik.errors.name}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email<span style={{ color: 'red' }}>*</span>
        </label>
        <div className="d-flex">
          <input
            type="text"
            className="form-control"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.email && formik.errors.email && <div style={{ color: 'red' }}>{formik.errors.email}</div>}
      </div>

      <div className="mb-3">
        <label htmlFor="course" className="form-label">
          Course<span style={{ color: 'red' }}>*</span>
        </label>
        <div className="d-flex">
          <input
            type="text"
            className="form-control"
            id="course"
            name="course"
            value={formik.values.course}
            onChange={formik.handleChange}
          />
        </div>
        {formik.touched.course && formik.errors.course && <div style={{ color: 'red' }}>{formik.errors.course}</div>}
      </div>

      <button type="submit" className="btn btn-primary mb-3">
        Submit
      </button>
    </form>
  );
}

export default MentorForm;
