import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import allSemesters from "../../../mockdata";
import TextField from "@mui/material/TextField";


import AddIcon from '@mui/icons-material/Add';

export default function PreRegisteringCourses() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortByStudents, setSortByStudents] = useState(null);
  const [showAllCourses, setShowAllCourses] = useState(false);
  const coursesPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
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
      setCurrentCourses(response.registrationCourses)
    }).catch(err => {
      console.log(err, "error")
    })
  }, [semesterID])



  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // Reset the current page when the search query changes
  };

  const handleSortByStudents = (criteria) => {
    setSortByStudents(criteria);
  };

  const handleShowMore = () => {
    setShowAllCourses(true);
  };
  const handleShowLess = () => {
    setShowAllCourses(false);
    setCurrentPage(1);
  };

  const lastIndex = currentPage * coursesPerPage;
  const firstIndex = lastIndex - coursesPerPage;
  return (
    <div className="semester">
      <div className="header">
        <p> Pre-Registering Courses  {semester.name} </p>
        <Link to={'add'}> <Button variant="text"> <AddIcon/> Add Course </Button> </Link> 
      </div>
      <hr />
      {semester ? (
        <div>
          <div className="filter-container RegisteringCoursesFilterContainer">
            <TextField
              id="filled-basic"
              label="Search courses"
              variant="filled"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <div className="filterbtn-container">
              <Button
                variant="contained"
                onClick={() => handleSortByStudents("most")}
              >
                Most Students
              </Button>
              <Button
                variant="contained"
                onClick={() => handleSortByStudents("least")}
              >
                Least Students
              </Button>
            </div>
            <div>
                <Button variant="contained"> Download Excel </Button>
            </div>
          </div>

          <ul className="registeringCoursesListContainer list">
            {currentCourses.map((course, index) => (
             
                <Card className="card registeringCoursesList">
                  <li>
                    <p className="courseName"> {course.name} </p>
                    <p className="numberOfRegistered"> {course.studentLength} Registered </p>
                    <span className="registeringCoursesBtns">
                     <Link  to={'StudentList/'+course.id}>  <Button variant="outlined"> Information </Button> </Link>
                      <Button variant="outlined"> Delete </Button>
                    </span>
                  </li>
                </Card>
            
            ))}
          </ul>
        </div>
      ) : (
        <h2>Semester not found.</h2>
      )}
    </div>
  );
}
