import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import MultiSelect from 'multiselect-react-dropdown';
import { AssignMentorsContext } from '../Context/AssignMentors';
import { useFormik } from 'formik';

function AssignStudentsToMentor() {
  const [mentors, setMentors, students, setStudents] = useContext(AssignMentorsContext);
  const [options, setOptions] = React.useState([]);

  useEffect(() => {
    const mappedOptions = students.map((student) => ({ name: student.name, value: student._id }));
    setOptions(mappedOptions);
  }, [students]);

  const formik = useFormik({
    initialValues: {
      mentor: '',
      selectedStudents: [],
    },
    onSubmit: async (values) => {
      try {
        const studList = values.selectedStudents.map((stud) => stud.value);

        await axios.patch(`https://localhost:4100/Students/assign-mentor-students`, {
          mentor: values.mentor,
          studList,
        });

        const studData = await axios.get(`https://mentor-and-student-be.onrender.com/Students`);
        setStudents(studData.data);

        formik.resetForm();
      } catch (error) {
        console.error('Error assigning students to mentor:', error);
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <h2 className="text-info">Assign Students to Mentor</h2>
        <div className="mb-3">
          <label htmlFor="students" className="form-label">
            Students<span style={{ color: 'red' }}>*</span>
          </label>
          <br />
          <div className="d-flex">
            <MultiSelect
              options={options}
              selectedValues={formik.values.selectedStudents}
              onSelect={(selectedList) => formik.setFieldValue('selectedStudents', selectedList)}
              onRemove={(selectedList) => formik.setFieldValue('selectedStudents', selectedList)}
              displayValue="name"
            />
          </div>
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
        </div>
        <br />
        <button type="submit" className="btn btn-primary mb-3">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AssignStudentsToMentor;
