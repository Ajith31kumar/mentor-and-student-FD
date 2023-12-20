import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AssignMentorsContext } from '../Context/AssignMentors';

function StudentForm() {
  const [mentors, setMentors, students, setStudents] = useContext(AssignMentorsContext);
  const [name, setname] = useState('');
  const [batch, setBatch] = useState('');
  const [assignmentor, setassignMentor] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("AssignesMentor", assignmentor);
    console.log(name, batch, assignmentor);
    const posted_stud = await axios.post(`http://localhost:4100/Students`, { name, batch, mentor: assignmentor });
    console.log(posted_stud.data);
    setStudents([...students, posted_stud.data]);
    setname('');
    setBatch('');
    setassignMentor('');
  };

  console.log(mentors);

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-info">Student Form</h2>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Student Name<span style={{ color: "red" }}>*</span>
        </label>
        <div className="d-flex">
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => { setname(e.target.value) }}
          />
        </div>
      </div> <br />
      
      <div className="mb-3">
        <label htmlFor="batch" className="form-label">
          Batch<span style={{ color: "red" }}>*</span>
        </label>
        <div className="d-flex">
          <input
            type="text"
            className="form-control"
            id="batch"
            value={batch}
            onChange={(e) => { setBatch(e.target.value) }}
          />
        </div>
      </div> <br/>

      <div className="mb-3">
        <label htmlFor="mentor" className="form-label">
          Mentor<span style={{ color: "red" }}>*</span>
        </label>
        <div className="d-flex">
          <select class="form-control" aria-label="Default select example" value={assignmentor} onChange={(e) => { setassignMentor(e.target.value) }}>
            <option value=""></option>
            {mentors.map((mentor) => {
              return <option value={mentor._id}>{mentor.name}</option>;
            })}
          </select>
        </div>
      </div><br/>

      <button type="submit" className="btn btn-primary mb-3">
        Submit
      </button>
    </form>
  );
}

export default StudentForm;
