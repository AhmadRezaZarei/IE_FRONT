import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';


export default function ITProfessorList() {
  
  const [showAll, setShowAll] = useState(false);
  const [professors, setProfessors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const handleShowMore = () => {
    setShowAll(true);
//    setProfessors(mockProfessors);
  };

  const handleShowLess = () => {
    setShowAll(false);
 //   setProfessors(mockProfessors.slice(0, 10));
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    filterProfessors(event.target.value);
  };

  const filterProfessors = (query) => {
    const filteredProfessors = professors.filter((professor) =>
      professor.name.toLowerCase().includes(query.toLowerCase())
    );
    setProfessors(filteredProfessors);
  };


  useEffect(() => {
    
    // fetch professors 
    const accessToken = localStorage.getItem("accessToken")

    const response = fetch("http://localhost:9090/admin/professors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + accessToken
      },
    }).then(response => response.json()).then(response => {
      setProfessors(response.professors)
    })


  }, [])

  return (
    <div className="professors">
      <div className="header">
        <p> List of Professors </p>
        <Link to={'ITAddProfessor'}> <Button variant="text"> <AddIcon/> Add Professors </Button> </Link> 
      </div>

      <hr />

      <div className="professors-container">
        <div className="filter-container RegisteringCoursesFilterContainer">
          <TextField
            variant="filled"
            label="Search Professors"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Button variant="contained"> Download Excel </Button>
        </div>

        <ul className="list">
          {professors.map((professor) => (
            <Card className="card">
              <li
                key={professor.idNumber}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <p>{professor.firstName + professor.lastName}</p>
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
