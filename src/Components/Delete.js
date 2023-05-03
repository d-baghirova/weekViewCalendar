import React from "react";
import styled from "styled-components";
import { useState, useEffect } from "react";

const Button = styled.button`
    margin-right: 30px;
    border: none;
    padding: 0;
    background: none;
`;

const Del = styled(Button)`
  display:none;
  font-size: 1.5rem;
  color: red;
  text-decoration: none;
  &:hover,
  &:focus {
    color: palevioletred;
  }
  &:active {
    color: coral;
  }
`;

const Heading = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f6f6f6;
  border: 2px solid transparent;
`

const H1 = styled.p`
  margin-left: 30px;
  font-size: 2rem;
`

const Day = styled.button`
  font-size: 1.5rem;
  border: 2px solid transparent;
  background-color:transparent;
  color:red
`

const Today = styled(Day)`
  font-size: 2rem;
  color: red;
  text-decoration: none;
  &:hover,
  &:focus {
    color: palevioletred;
  }
  &:active {
    color: coral;
  }
`;

export default function Delete({query, onQuery, onClicked, clicked, onQueryDelete, queryDelete, week, onQueryV}) {

  const [deleteIt, setDeleteIt] = useState('');

  const findField = (date) => {
    let dayArr =  week.filter(d => date.slice(0,10) === d.slice(0,10));
    let day = week.indexOf(dayArr[0]);
    let hour = (Number(date.slice(14, 16)))-8;
    let fieldId = hour*7 + day;
    return fieldId;
  }

  const deleteItem = () => {
    let q = query.filter(f => findField(f)+'btn' !== queryDelete);
    return q;
  }

  const handleToday = () => {
    //let datee = prompt("YYYY-MM-DD HH:mm:ss");
    let q = new Date();
    let qu = q.toISOString();
    onQueryV([qu]);
  }

  useEffect(() => {
    if(clicked[0]){
      document.getElementById('delete').style.display = 'block';
      document.getElementById('delete').onclick = ()=>{
      setDeleteIt(`${clicked[1]}`);
      onQueryDelete(`${clicked[1]}` );
      onQuery(deleteItem);
      onClicked([false])
    }
    } else {
      document.getElementById('delete').style.display = 'none';
     
    }
  }, [clicked])
  
  return ( 
    <Heading>
      <Today id='today' onClick={handleToday}>Today</Today>
      <Del id="delete">Delete</Del>
    </Heading>
  );
}