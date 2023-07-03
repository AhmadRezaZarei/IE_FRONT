import React, { useState , useEffect } from "react";
import { Link } from "react-router-dom";
import Card from "@mui/material/Card";

import { Button } from "@mui/material";
import { useSelector } from "react-redux";
import {Authentication , NavigateToRole} from '../../../Authentication/Authentication'


export default function PrincipleSemesters() {


  const [semesters, setSemesters] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const { mode } = useSelector((state) => state.darkMode);



  useEffect(() => {
    
    const fetchTerms = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken")
        const response = await fetch("http://127.0.0.1:9090/terms", {
          headers: {
            "Content-Type": "application/json",
            "Authorization" : "Bearer " + accessToken
          },
        });
        const data = await response.json();
        console.log(data);
        setSemesters(data.terms)
      } catch (error) {
        console.error(error);
      }
    };

    fetchTerms();
  }, []);

  const handleShowMore = () => {
    setShowAll(true);
 //   setSemesters(allSemesters);
  };

  const handleShowLess = () => {
    setShowAll(false);
  //  setSemesters(allSemesters.slice(0, 6));
  };

  return (
    <div className="semesters">
      <div className="header">
        <p> Check the Semesters </p>

        <Link style={{ textDecoration: "none" }} to={"addSemester"}>
          <Button variant="text"> Add Semester</Button>
        </Link>
      </div>
      <hr />
      <div className="semesters-container">
        <ul className='list'>
          {semesters.map((semester) => (
            <Link key={semester.idNumber} to={`/principle/${semester.idNumber}/course`}>
              <Card className="card">
                <li>
                  <p
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {semester.name}
                    <span style={{ display: "flex", gap: "5px" }}>
                      <Link style={{ textDecoration: "none" }} to={`${semester.idNumber}/edit` }>
                        <Button variant="outlined"> Edit </Button>
                      </Link>
                      <Link to={""}>
                        <Button variant="contained"> Delete </Button>
                      </Link>
                    </span>
                  </p>
                </li>
              </Card>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
}
