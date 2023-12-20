import React, { useContext } from 'react';
import { AssignMentorsContext } from '../Context/AssignMentors';

function StudentTable() {
  const [mentors, , students] = useContext(AssignMentorsContext); // Removed setMentors from destructuring

  return (
    <div className="position-absolute top-0 end-0 p-3">
      <h2 className="text-info">Students List</h2>
      <table className="table table-striped" style={{ color: 'black', border: '1px solid black' }}>
        <thead className='thead-dark'>
          <tr>
            <th scope="col" style={{ border: '1px solid black' }}>Name</th>
            <th scope="col" style={{ border: '1px solid black' }}>Batch</th>
            <th scope="col" style={{ border: '1px solid black' }}>Mentor</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => {
            const stud_mentor = mentors.filter((mentor) => mentor._id === student.mentor);
            console.log(stud_mentor);
            return (
              <tr key={student._id} style={{ border: '1px solid black' }}>
                <td style={{ border: '1px solid black' }}>{student.name}</td>
                <td style={{ border: '1px solid black' }}>{student.batch}</td>
                <td style={{ border: '1px solid black' }}>{stud_mentor[0] ? stud_mentor[0].name : ''}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StudentTable;
