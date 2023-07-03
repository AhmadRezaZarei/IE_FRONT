import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import allSemesters from "../../../mockdata";
import TextField from "@mui/material/TextField";
import "./RegisteringCourses.css";
import AddIcon from '@mui/icons-material/Add';

export default function RegisteringCourses() {
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
    // ferch coursses


    const accessToken = localStorage.getItem("accessToken")

    const response = fetch("http://localhost:9090/term/" + semesterID + "/preregistration_courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + accessToken
      }
    }).then(response => response.json()).then(response => {

      const courses = response.registrationCourses
            
      for(let i = 0; i < courses.length; i++){
        courses[i].students = []
      }
      console.log(courses)
      setCurrentCourses(courses)
    }).catch(err => {
      console.log(err)
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

  let filteredCourses = semester ? semester.courses : [];

  if (searchQuery) {
    filteredCourses = filteredCourses.filter((course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

 
  return (
    <div className="semester">
      <div className="header">
        <p> Registering Courses  {semester.name} </p>
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
                    <p className="numberOfRegistered"> {course.students.length} Registered </p>
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
