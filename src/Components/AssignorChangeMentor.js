import React, { useContext } from 'react';
import { useFormik } from 'formik';
import axios from 'axios';
import { AssignMentorsContext } from '../Context/AssignMentors';

function AssignorChangeMentor() {
  const [mentors, setMentors, students, setStudents] = useContext(AssignMentorsContext);

  const formik = useFormik({
    initialValues: {
      student: '',
      mentor: '',
    },
    onSubmit: async (values) => {
      try {
        const updatedMentor = await axios.patch(
          `https://mentor-and-student-be.onrender.com/Students/assign-mentor${values.student}`,
          { mentor: values.mentor }
        );

        console.log(updatedMentor);

        const studData = await axios.get(`https://mentor-and-student-be.onrender.com/Students`);
        setStudents(studData.data);
        formik.resetForm();
      } catch (error) {
        console.error('Error updating mentor:', error);
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h2 className="text-info">Change Mentor</h2>
        <div className="mb-3">
          <label htmlFor="student" className="form-label">
            Student<span style={{ color: 'red' }}>*</span>
          </label>
          <br />
          <div className="d-flex">
            <select
              className="form-control"
              aria-label="Default select example"
              value={formik.values.student}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="student"
            >
              <option value=""></option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
          {formik.touched.student && formik.errors.student && (
            <div style={{ color: 'red' }}>{formik.errors.student}</div>
          )}
        </div>
        <br />
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
        <br />
        <button type="submit" className="btn btn-primary mb-3" style={{ backgroundColor: 'light blue' }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default AssignorChangeMentor;
