import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import allSemesters from "../../../mockdata";
import { Divider } from "@mui/material";
import Card from "@mui/material/Card";
import { Link } from "react-router-dom";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import "./PrincipleSemester.css";
export default function PrincipleSemester() {

  let { semesterID } = useParams();
  const [semester, setSemester] = useState({name: "todo"})



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

  return (
    <div className="semester">
      <div className="header">
        <p> {semester.name} </p>
      </div>
      <hr />
      <div className="cards semester-cards">
      <Link to={"PreRegisteringCourses"}>
          <Card className="studentSemesterCard">
            <LocalLibraryIcon className="semesterIcon"></LocalLibraryIcon>
            Pre-Registering Courses
          </Card>
        </Link>
        <Link to={"RegisteringCourses"}>
          <Card className="studentSemesterCard">
            <LibraryBooksIcon className="semesterIcon"></LibraryBooksIcon>
            Registering Courses
          </Card>
        </Link>
        
      </div>
    </div>
  );
}
