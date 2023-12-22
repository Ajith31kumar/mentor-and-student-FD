// AssignMentors.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';

export const AssignMentorsContext = React.createContext();

export const AssignMentorProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [mentors, setMentors] = useState([]);
  const BaseURL = `https://mentor-and-student-be.onrender.com`;

  // Define fetchData using useCallback
  const fetchData = useCallback(async () => {
    try {
      const mentorsResponse = await axios.get(`${BaseURL}/Mentors`);
      setMentors(mentorsResponse.data);

      const studentsResponse = await axios.get(`${BaseURL}/Students`);
      setStudents(studentsResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, [BaseURL]); // Include BaseURL in the dependency array

  useEffect(() => {
    fetchData();
    // No need to return anything in the cleanup function
  }, [fetchData]); // Include fetchData in the dependency array

  // Formik configuration
  const formik = useFormik({
    initialValues: {
      student: '',
      mentor: '',
    },
    onSubmit: async (values) => {
      try {
        const updatedMentor = await axios.patch(
          `${BaseURL}/Students/assign-mentor${values.student}`,
          { mentor: values.mentor }
        );

        console.log(updatedMentor);

        const studData = await axios.get(`${BaseURL}/Students`);
        setStudents(studData.data);

        // Reset form values after submission
        formik.resetForm();
      } catch (error) {
        console.error('Error assigning mentor:', error);
      }
    },
  });

  return (
    <AssignMentorsContext.Provider value={[mentors, setMentors, students, setStudents]}>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <h2 className="text-info">Change Mentor</h2>
          <div className="mb-3">
            <label htmlFor="student" className="form-label">
              Student<span style={{ color: "red" }}>*</span>
            </label>
            <br />
            <div className="d-flex">
              <select
                className="form-control"
                aria-label="Default select example"
                value={formik.values.student}
                onChange={formik.handleChange}
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
          </div>
          <br />
          <div className="mb-3">
            <label htmlFor="mentor" className="form-label">
              Mentor<span style={{ color: "red" }}>*</span>
            </label>
            <div className="d-flex">
              <select
                className="form-control"
                aria-label="Default select example"
                value={formik.values.mentor}
                onChange={formik.handleChange}
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
          </div>
          <br />
          <button type="submit" className="btn btn-primary mb-3" style={{ backgroundColor: 'lightblue' }}>
            Submit
          </button>
        </form>
      </div>
      {children}
    </AssignMentorsContext.Provider>
  );
};
