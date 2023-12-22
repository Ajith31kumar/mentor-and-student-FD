import React, { useState } from 'react';
import { useContext } from 'react';
import axios from 'axios';
import { AssignMentorsContext } from '../Context/AssignMentors';
import { useFormik } from 'formik';

function ShowMentorStudents() {
  const [mentors, setMentors] = useContext(AssignMentorsContext);
  const [studList, setStudList] = useState('');

  const formik = useFormik({
    initialValues: {
      mentor: '',
    },
    onSubmit: async (values) => {
      try {
        const studentList = await axios.get(`https://mentor-and-student-be.onrender.com/Students/mentor-students/${values.mentor}`);
        setStudList(studentList.data);
        formik.resetForm();
      } catch (error) {
        console.error('Error fetching student list:', error);
      }
    },
  });

  return (
    <div>
      <h2 className="text-info">Students List based on Mentor Selection</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="mentor" className="form-label">
            Mentor<span style={{ color: 'red' }}>*</span>
          </label>
          <div className="d-flex">
            <select
              className="form-control"
              aria-label="Default select example"
              value={formik.values.mentor}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="mentor"
            >
              <option value=""></option>
              {mentors.map((mentor) => (
                <option key={mentor._id} value={mentor._id}>
                  {mentor.name}
                </option>
              ))}
            </select>
          </div>
          {formik.touched.mentor && formik.errors.mentor && (
            <div style={{ color: 'red' }}>{formik.errors.mentor}</div>
          )}
        </div>
        <button type="submit" className="btn btn-primary mb-3">
          Show
        </button>
      </form>
      {studList.length ? (
        <>
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Batch</th>
              </tr>
            </thead>
            <tbody>
              {studList.map((student) => (
                <tr key={student._id}>
                  <td>{student.name}</td>
                  <td>{student.batch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        ''
      )}
    </div>
  );
}

export default ShowMentorStudents;
