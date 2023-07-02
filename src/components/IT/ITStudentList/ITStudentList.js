import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';

export default function ITStudentList() {

  
  const [showAll, setShowAll] = useState(false);

  const [students, setStudents] = useState([]);
  
  const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {

    const accessToken = localStorage.getItem("accessToken")

    const response = fetch("http://localhost:9090/admin/students", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + accessToken
      },
    }).then(response => response.json()).then(response => {
      setStudents(response.students)
    })



   // setStudents([{id: "1", "name": "reza"}])


  },[])

  const handleShowMore = () => {
    setShowAll(true);
  //  setStudents(mockStudents);
  };
  const handleShowLess = () => {
    setShowAll(false);
///    setStudents(mockStudents.slice(0, 10));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    filterStudents(event.target.value);
  };

  const filterStudents = (query) => {
    const filteredStudents = students.filter((student) =>
      student.name.toLowerCase().includes(query.toLowerCase())
    );
    setStudents(filteredStudents);
  };

  return (
    <div className="students">
      <div className="header">
        <p> List of Students </p>
        <Link to={'ITAddStudent'}> <Button variant="text"> <AddIcon/> Add Student </Button> </Link> 
      </div>

      <hr />

      <div className="semesters-container">
        <div className="filter-container RegisteringCoursesFilterContainer">
          <TextField
            variant="filled"
            label="Search Students"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button variant="contained"> Download Excel </Button>
        </div>

        <ul className="list">
          {students.map((student) => (
            <Card className="card">
              <li
                key={student.idNumber}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p>{student.firstName + " " + student.lastName}</p>
                <div className="status-buttons">
                  <Button variant="text"> Delete </Button>
                </div>
              </li>
            </Card>
          ))}
        </ul>
        
      </div>
    </div>
  );
}
