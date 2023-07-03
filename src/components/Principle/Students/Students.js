import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import allSemesters from "../../../mockdata";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";

export default function Students() {

  
  const [showAll, setShowAll] = useState(false);

  const [students, setStudents] = useState([]);
  
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
 //   setStudents(mockStudents.slice(0, 10));
  };

  return (
    <div className="students">
      <div className="header">
        <p> Students list </p>
      </div>
      <div className="search-container"></div>
      <hr />

      <div className="semesters-container">
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
              </li>
            </Card>
          ))}
        </ul>
        <div className="btn-container">
          { (
            !showAll ? (
              <Button
                className="showMore btn"
                variant="contained"
                onClick={handleShowMore}
              >
                More
              </Button>
            ) : (
              <Button
                className="btn"
                variant="contained"
                onClick={handleShowLess}
              >
                Less
              </Button>
            )
          ) }
        </div>
      </div>
    </div>
  );
}
