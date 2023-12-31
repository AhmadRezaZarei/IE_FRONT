import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import allSemesters from "../../../mockdata";

import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";


export default function ProCoursePreReg() {

  let { semesterID } = useParams();
  const [semester, setSemester] = useState({name: "todo"})
  const [currentCourses, setCurrentCourses] = useState([])

  useEffect(() => {

    const accessToken = localStorage.getItem("accessToken")

    const response = fetch("http://localhost:9090/term/" + semesterID, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + accessToken
      },
    }).then(response => response.json()).then(response => {
      setSemester(response.term)
    })

  }, [semesterID])


  useEffect(() => {

    const accessToken = localStorage.getItem("accessToken")

    const response = fetch("http://localhost:9090/term/" + semesterID + "/preregistration_courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + accessToken
      },
    }).then(response => response.json()).then(response => {
      console.log("fetched courses")
      setCurrentCourses(response.registrationCourses)
    }).catch(err => {
      console.log(err, "error")
    })
  }, [semesterID])


  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  let filteredCourses = currentCourses;
  if (searchQuery) {
    filteredCourses = filteredCourses.filter((course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  const toggleShowAll = () => {
    setShowAll((prevShowAll) => !prevShowAll);
  };


  const registerCourse = (index) => {
    
    const course = currentCourses[index]
    
    // call the register api

    

  }

  return (
    <div className="semester">
      <div className="header">
        <p> Provided Courses for Pre-Registration </p>
      </div>
      <hr />
      <div>
        <div className="filter-container">
          <TextField
            id="filled-basic"
            label="Search courses"
            variant="filled"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <ul className="list">
          {currentCourses.map((course, index) => (
            <Card className="card">
              <li>
                
                <p style={{ display: "flex", justifyContent: "space-between" }}>
                  
                  {course.name}
                  <span>
                    
                    <Button variant="contained" onClick={() => {
                      registerCourse(index)
                    }}> Pre-Registrate </Button>
                    <Button variant="outlined"> Information </Button>
                  </span>
                </p>
              </li>
            </Card>
          ))}
        </ul>
        {filteredCourses.length > 6 && (
          <div className="btn-container">
            {showAll ? (
              <Button onClick={toggleShowAll}>Less</Button>
            ) : (
              <Button onClick={toggleShowAll}>More</Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
