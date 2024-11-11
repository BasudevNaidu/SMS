import React from 'react';
import './StudentStats.css';

const StudentStats = ({ students }) => {
  const totalStudents = students.length;
  const averageAge =
    totalStudents > 0
      ? (students.reduce((sum, student) => sum + parseInt(student.age), 0) / totalStudents).toFixed(1)
      : 0;

  return (
    <div className="student-stats">
      <p>Total Students: {totalStudents}</p>
      <p>Average Age: {averageAge}</p>
    </div>
  );
};

export default StudentStats;
