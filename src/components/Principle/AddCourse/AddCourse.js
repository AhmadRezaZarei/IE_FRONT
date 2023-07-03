import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { InputLabel } from "@mui/material";
import Card from "@mui/material/Card";
import "./AddCourse.css";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import allSemesters from "../../../mockdata";

export default function AddCourse() {
  let { semesterID } = useParams();
  const [semester, setSemester] = useState({name: "todo"})




  const [name, setName] = useState("");
  const [professorName, setProfessorName] = useState("");
  const [capacity, setCapacity] = useState("");
  const [classDateTime, setClassDateTime] = useState(null);
  const [examDateTime, setExamDateTime] = useState(null);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleProfessorName = (event) => {
    setProfessorName(event.target.value);
  };

  const handleCapacityChange = (event) => {
    setCapacity(event.target.value);
  };

  const handleClassDateTimeChange = (dateTime) => {
    setClassDateTime(dateTime);
  };

  const handleExamDateTimeChange = (dateTime) => {
    setExamDateTime(dateTime);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
    console.log("Name:", name);
    console.log("Capacity:", capacity);
    console.log("Class Date and Time:", classDateTime);
    console.log("Exam Date and Time:", examDateTime);
    // Additional logic for form submission

    // add course

    // call the api

    const accessToken = localStorage.getItem("accessToken")

    const response = fetch("http://localhost:9090/term/" + semesterID + "/preregistration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + accessToken
      },
      body: JSON.stringify({
        name: name,
        professorName: professorName, 
        termId: semesterID,
        capacity: capacity,
        classDateTime: classDateTime, 
        examDateTime: examDateTime
      })
    }).then(response => response.json()).then(response => {
      console.log("courses added !!")
    }).catch(err => {
      console.log(err)
    })
    





  };

  return (
    <div style={{ height: "80%" }} className="semester">
      <div className="header">
        <p> Add Course to {semester.name} </p>
      </div>
      <hr />
      <div className="form-container">
        <form className="addCourse-form" onSubmit={handleSubmit}>
          <TextField
            label="Course Name"
            value={name}
            onChange={handleNameChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Professor Name"
            value={professorName}
            onChange={handleProfessorName}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            label="Capacity"
            value={capacity}
            onChange={handleCapacityChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <DateTimePicker
            className="DateTimePicker"
            label="date and time of class"
          />

          <DateTimePicker
            className="DateTimePicker"
            label="date and time of exam"
          />

          <Button
            className="addCourseBtn"
            style={{ width: "100%", marginTop: "70px" }}
            variant="contained"
            type="submit"
          >
            Add Course
          </Button>
        </form>
      </div>
    </div>
  );
}
