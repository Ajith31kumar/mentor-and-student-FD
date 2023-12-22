import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import MultiSelect from 'multiselect-react-dropdown';
import { AssignMentorsContext } from '../Context/AssignMentors';

function AssignStudentsToMentor() {
  const [mentors, setMentors, students, setStudents] = useContext(AssignMentorsContext);
  const [mentor, setMentor] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    const mappedOptions = students.map((student) => ({ name: student.name, value: student._id }));
    setOptions(mappedOptions);
  }, [students]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const studList = selectedStudents.map((stud) => stud.value);

    await axios.patch(`https://mentor-and-student-be.onrender.com/Students/assign-mentor-students`, {
      mentor,
      studList,
    });

    const studData = await axios.get(`https://mentor-and-student-be.onrender.com/Students`);
    setStudents(studData.data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="text-info">Assign Students to Mentor</h2>
        <div className="mb-3">
          <label htmlFor="student" className="form-label">
            Student<span style={{ color: "red" }}>*</span>
          </label> <br/>
          <div className="d-flex">
            <select
              className="form-control"
              aria-label="Default select example"
              // value={student}
              // onChange={(e) => { setStudent(e.target.value) }}
            >
              <option value=""></option>
              {students.map((student) => (
                <option key={student._id} value={student._id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
        </div><br/>
        <div className="mb-3">
          <label htmlFor="mentor" className="form-label">
            Mentor<span style={{ color: "red" }}>*</span>
          </label>
          <div className="d-flex">
            <select
              className="form-control"
              aria-label="Default select example"
              value={mentor}
              onChange={(e) => { setMentor(e.target.value) }}
            >
              <option value=""></option>
              {mentors.map((mentor) => (
                <option key={mentor._id} value={mentor._id}>
                  {mentor.name}
                </option>
              ))}
            </select>
          </div>
        </div><br/>
        <button type="submit" className="btn btn-primary mb-3">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AssignStudentsToMentor;
