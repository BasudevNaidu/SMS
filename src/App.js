import React, { useState, useEffect } from 'react';
import Header from './components.js/Header';
import StudentForm from './components.js/StudentForm';
import StudentList from './components.js/StudentList';
import StudentStats from './components.js/StudentStats';
import SearchBar from './components.js/SearchBar';
import Footer from './components.js/Footer';
import './App.css';

const App = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Load students from local storage on initial render
  useEffect(() => {
    const storedStudents = JSON.parse(localStorage.getItem("students"));
    if (storedStudents) {
      setStudents(storedStudents);
    }
  }, []);

  // Update local storage whenever students change
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const addStudent = (student) => {
    if (editingStudent) {
      setStudents(
        students.map((s) =>
          s.id === editingStudent.id ? { ...student, id: editingStudent.id } : s
        )
      );
      setEditingStudent(null);
    } else {
      setStudents([...students, { ...student, id: Date.now() }]);
    }
  };

  const editStudent = (student) => setEditingStudent(student);

  const deleteStudent = (id) => setStudents(students.filter((s) => s.id !== id));

  const filteredStudents = students.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="app-container">
      <Header />
      <SearchBar setSearchQuery={setSearchQuery} />
      <StudentForm addStudent={addStudent} editingStudent={editingStudent} />
      <StudentStats students={students} />
      <StudentList
        students={filteredStudents}
        editStudent={editStudent}
        deleteStudent={deleteStudent}
      />
      <Footer />
    </div>
  );
};

export default App;
