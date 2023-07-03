import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";


import "./AddStudent.css";
const faculties = [
  { value: "faculty1", label: "Faculty 1" },
  { value: "faculty2", label: "Faculty 2" },
  { value: "faculty3", label: "Faculty 3" },
];

const majors = [
  { value: "major1", label: "Major 1" },
  { value: "major2", label: "Major 2" },
  { value: "major3", label: "Major 3" },
];

export default function AddStudent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [passedCourses, setPassedCourses] = useState("");
  const [faculty, setFaculty] = useState("");
  const [major, setMajor] = useState("");
  const [yearOfEntry, setYearOfEntry] = useState(new Date());

  const [phone, setPhone] = useState("");
  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleStudentPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePassedCoursesChange = (event) => {
    setPassedCourses(event.target.value);
  };

  const handleFacultyChange = (event) => {
    setFaculty(event.target.value);
  };

  const handleMajorChange = (event) => {
    setMajor(event.target.value);
  };



  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };
  const handleAddCourse = () => {
    // Logic to add a passed course
    const course = ""; // Add your logic here to get the selected course
    setPassedCourses([...passedCourses, course]);
  };

  const handleSubmit = (event) => {
     event.preventDefault();
    // console.log("Form submitted");
    // console.log("First Name:", firstName); // check 
    // console.log("Last Name:", lastName); // check 
    // console.log("Student Number:", studentNumber);
    // console.log("ID Number:", idNumber);
    // console.log("Passed Courses:", passedCourses);
    // console.log("Faculty:", faculty);
    // console.log("Major:", major);
    // console.log("Year of Entry:", yearOfEntry.getFullYear().toString());
    // console.log("Teacher Assistant:", teacherAssistant);
    // // Additional logic for form submission



    // console.log("api called")
    // call the api

    
    const accessToken = localStorage.getItem("accessToken")

    const response = fetch("http://localhost:9090/admin/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization" : "Bearer " + accessToken
      },
      body: JSON.stringify({
        "firstName": firstName,
        "lastName": lastName,
        "password": password,
        "email": email,
        "phone": phone,
        "faculty": faculty,
        "fieldOfStudy": major,
    })
    }).then(response => response.json()).then(response => {
      console.log("studnet added")
    })



  };
  return (
    <div style={{ height: "80%" }} className="semester">
      <div className="header formHeader">
        <p> Add/Change for new Student </p>
      </div>
      <hr />
      <div className="form-container">
        <form className="addCourse-form" onSubmit={handleSubmit}>
          <TextField
            label="First Name"
            value={firstName}
            onChange={handleFirstNameChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            select
            label="Faculty"
            value={faculty}
            onChange={handleFacultyChange}
            fullWidth
            margin="normal"
            variant="outlined"
          >
            {faculties.map((faculty) => (
              <MenuItem key={faculty.value} value={faculty.value}>
                {faculty.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Last Name"
            value={lastName}
            onChange={handleLastNameChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <TextField
            select
            label="Major"
            value={major}
            onChange={handleMajorChange}
            fullWidth
            margin="normal"
            variant="outlined"
          >
            {majors.map((major) => (
              <MenuItem key={major.value} value={major.value}>
                {major.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="password"
            value={password}
            onChange={handleStudentPasswordChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />


          <TextField
            label="email"
            value={email}
            onChange={handleEmailChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />

          <TextField
            label="Phone"
            value={phone}
            onChange={handlePhoneChange}
            fullWidth
            margin="normal"
            variant="outlined"
          />
          <Button className="addCourseBtn" variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
}
