import React, { useState , useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';

import allSemesters from "../../../mockdata";
import { useSelector } from "react-redux";

export default function StudentSemesters() {


  const [semesters, setSemesters] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const { mode } = useSelector((state) => state.darkMode);

  useEffect(() => {
    
    const fetchTerms = async () => {
      console.log("fetch term called")
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
    setSemesters(allSemesters);
  };

  const handleShowLess = () => {
    setShowAll(false);
    setSemesters(allSemesters.slice(0, 6));
  };

  return (
    

    <div className='semesters '>
      <p> Check the Semesters </p>
      <hr/>
      <div className='semesters-container'>
        <ul className='list'>
          {semesters.map((semester) => (
            <Link key={semester.idNumber} to={`` + semester.idNumber}>
              <Card className='card'>
                <li>
                  <p> {semester.name} </p>
                </li>
              </Card>
            </Link>
          ))}
        </ul>
        <div className='btn-container'>
          {semesters.length > 6 && !showAll ? (
            <Button className='showMore btn' onClick={handleShowMore}>
              More
            </Button>
          ) : (
            showAll && (
              <Button className='btn' onClick={handleShowLess}>
                Less
              </Button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
