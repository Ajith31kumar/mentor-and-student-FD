import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AssignMentorsContext } from '../Context/AssignMentors';

function AssignorChangeMentor() {
  const [mentors, setMentors, students, setStudents] = useContext(AssignMentorsContext);
  const [student, setStudent] = useState('');
  const [mentor, setMentor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updated_mentor = await axios.patch(`https://mentor-and-student-be.onrender.com/Students/assign-mentor${student}`, { mentor });
    console.log(updated_mentor);
    const stud_data = await axios.get(`https://mentor-and-student-be.onrender.com/Students`);
    setStudents(stud_data.data);
    setStudent('');
    setMentor('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2 className="text-info">Change Mentor</h2>
        <div className="mb-3">
          <label htmlFor="student" className="form-label">
            Student<span style={{ color: "red" }}>*</span>
          </label> <br/>
          <div className="d-flex">
            <select
              className="form-control"
              aria-label="Default select example"
              value={student}
              onChange={(e) => { setStudent(e.target.value) }}
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
        <button type="submit" className="btn btn-primary mb-3" style={{backgroundColor:'light blue'}}>
          Submit
        </button>
      </form>
    </div>
  );
}
//vFyL3UmPueNfjZFF
export default AssignorChangeMentor;
