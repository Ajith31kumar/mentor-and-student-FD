import React, { useContext } from 'react';
import { AssignMentorsContext } from '../Context/AssignMentors';

function MentorTable() {
  const [mentors, setMentors] = useContext(AssignMentorsContext);

  return (
    <div className="position-absolute top-0 end-0 p-3">
      <h2 className="text-info">Mentor List</h2>
      <table className="table table-striped" style={{ color: 'black', border: '1px solid black' }}>
        <thead className='thead-dark'>
          <tr>
            <th scope="col" style={{ border: '1px solid black' }}>Name</th>
            <th scope="col" style={{ border: '1px solid black' }}>Email</th>
            <th scope="col" style={{ border: '1px solid black' }}>Course</th>
          </tr>
        </thead>
        <tbody>
          {mentors.map((mentor) => (
            <tr key={mentor._id} style={{ border: '1px solid black' }}>
              <td style={{ border: '1px solid black' }}>{mentor.name}</td>
              <td style={{ border: '1px solid black' }}>{mentor.email}</td>
              <td style={{ border: '1px solid black' }}>{mentor.course}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MentorTable;
