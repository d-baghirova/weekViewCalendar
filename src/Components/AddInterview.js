import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Button = styled.button`
    border: none;
    padding: 0;
    background: none;
`;

const Plus = styled(Button)`
  font-size: 1.2rem;
  color: red;
  text-decoration: none;
  margin-right: 10px;
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
`

const H1 = styled.p`
  font-size: 1.5rem;
  background-color: white; 
  display: flex; 
  @media (max-width: 750px) {
    font-size: 1rem;
    margin-left: 10px;
  }
`

const Mimic = styled.form`
border: 2px solid gray; background-color: white; display: flex; flex-direction:column"
`

export default function AddInterview({query, onQuery, queryV, onQueryV, onWeek, onYear, onMonth}) {

  useEffect(() => {
    if (typeof queryV[0] === 'string'){
    currently()}
  },[queryV])

  const validate = (str) => {
    if (str && str.length >= 18){
      return !Number.isNaN(new Date(str[0, 18]).getTime());
    } else {
      return false;
    }
  }

  const validateHour = (str) => {
    if (str){
      let num = str[11]==='0' ? Number(str.slice(12,13)) : Number(str.slice(11, 13));
      if (num > 7 && num < 21){
        return true
      } else {
        return false
      }
    }
  }

  //2023-12-18 13:00:00 JOTORO

  const handlePlus = () => {
    let datee = prompt("YYYY-MM-DD HH:mm:ss describtion");
    console.log(validateHour(datee))
    if (validate(datee) && validateHour(datee) && !(query.includes(datee.slice(0,10) + 'T' + datee.slice(11,19)+'.000Z'))){
      let format = datee.slice(0,10) + 'T' + datee.slice(11,19)+'.000Z'+datee.slice(19);
      onQueryV([format]);
      onQuery([...query, format])
    } else if (!validate(datee)) {
      alert('Incorect input! Correct input example: 2020-12-18 10:10:08 (year-month-day hours:minutes:seonds)')
    } else if (!validateHour(datee)){
      alert('You can schedule an interview only between 08:00 and 20:00!')
    }
  }

  const currently = () => {
    if (queryV[0]!==undefined && queryV[0]!==null && queryV[0]!==false){
    let chosenDay = queryV[queryV.length-1];
    if (chosenDay){
    let mon = getMonday(chosenDay.slice(0, 23));
    let result = getWeekFromDate(mon);
    onYear(mon.slice(0,4));
    onMonth(mon.slice(5,7));
    onWeek(result);}
  }
  }

  const getMonday = (d) => {
    d = new Date(d);
    let day = d.getDay(),
       diff = d.getDate() - day + (day === 0 ? -6:1); 
    let result = new Date(d.setDate(diff))
    return result.toISOString();
}

const  getWeek = (mon) => {
    let arr = [];
    arr.push(mon);
    for (let i=0; i<=5; i++){
        arr.push(getNextDate(arr[i]).toISOString());
    }
    return arr;
}

const getNextDate = (str) => {
    const today = Date.parse(str);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
}

const getWeekFromDate = (d) => {
    let mon = getMonday(d);
    let arr = getWeek(mon);
    return arr;
}

  return (
    <Heading id='heading'>
      <H1>Events Calendar</H1>
      <Plus onClick={handlePlus}>+</Plus>
    </Heading>
  );
}