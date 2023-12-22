import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AssignMentorsContext } from '../Context/AssignMentors';
import { useFormik } from 'formik';

function StudentForm() {
  const [mentors, setMentors, students, setStudents] = useContext(AssignMentorsContext);

  const formik = useFormik({
    initialValues: {
      name: '',
      batch: '',
      assignmentor: '',
    },
    onSubmit: async (values) => {
      try {
        const postedStud = await axios.post(`https://mentor-and-student-be.onrender.com/Students`, {
          name: values.name,
          batch: values.batch,
          mentor: values.assignmentor,
        });
        setStudents([...students, postedStud.data]);
        formik.resetForm();
      } catch (error) {
        console.error('Error posting student:', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <h2 className="text-info">Student Form</h2>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Student Name<span style={{ color: 'red' }}>*</span>
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
      </div>
      <br />

      <div className="mb-3">
        <label htmlFor="batch" className="form-label">
          Batch<span style={{ color: 'red' }}>*</span>
        </label>
        <div className="d-flex">
          <input
            type="text"
            className="form-control"
            id="batch"
            name="batch"
            value={formik.values.batch}
            onChange={formik.handleChange}
          />
        </div>
      </div>
      <br />

      <div className="mb-3">
        <label htmlFor="assignmentor" className="form-label">
          Mentor<span style={{ color: 'red' }}>*</span>
        </label>
        <div className="d-flex">
          <select
            className="form-control"
            aria-label="Default select example"
            id="assignmentor"
            name="assignmentor"
            value={formik.values.assignmentor}
            onChange={formik.handleChange}
          >
            <option value=""></option>
            {mentors.map((mentor) => (
              <option key={mentor._id} value={mentor._id}>
                {mentor.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <br />

      <button type="submit" className="btn btn-primary mb-3">
        Submit
      </button>
    </form>
  );
}

export default StudentForm;
