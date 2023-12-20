// AssignMentors.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

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

  return (
    <AssignMentorsContext.Provider value={[mentors, setMentors, students, setStudents]}>
      {children}
    </AssignMentorsContext.Provider>
  );
};
