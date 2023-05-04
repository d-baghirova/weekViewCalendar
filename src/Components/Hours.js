import React from "react";
import styled from 'styled-components';
import { useState, useEffect } from "react";

const Grid = styled.div`
display: grid;
width: 87%;
grid-template-columns: repeat(7, 1fr);
grid-template-row: repeat(18, 1fr);
background-color: #e6e6e6;
grid-gap: 1px
`

const H = styled.div`
width: 12%;
color: #e6e6e6;
`

const Hour = styled.div`
display:flex
`

function Hours({query, onClicked, clicked, queryDelete, onQueryDelete, week}) {

  const [hs, setHs] = useState('');
  const [fields, setFields] = useState('');
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    makeHs();
    findMod2();
  }, [])

  const makeHs = () => {
    let hours = document.getElementById("H");
    let str;
    for (let i=9; i<21; i++){
      Math.floor(i/10)===0 ? str += `<h3>${`0${i}:00`}</h3>` : str += `<h3>${`${i}:00`}</h3>`;
    }
    if (str !== undefined && str !== null){
      setHs(str)
    }
  }

  const findMod = (j) => {
    for (let i=0; i<7; i++){
      if (j%7 === (6-i)){
        return `<div id=${j} style="background-color: white;
        text-align: center;" class="grid-item"><br /><label>
        </ label></div>`
      }
    }
  }

  const findMod2 = () => {
    let s = ``;
    let str = ``;
    for (let i=0; i<(13*7); i++){
      s = findMod(i);
      str += s
    } if (str !== undefined && str !== null){
      setFields(str)
    }
  }

  const findField = (date) => {
    let dayArr =  week.filter(d => date.slice(0,10) === d.slice(0,10));
    let day = week.indexOf(dayArr[0]);
    let hour = (Number(date.slice(14, 16)))-8;
    let fieldId = hour*7 + day;
    return fieldId;
  }

  const toggleClick = (e) => {
    onClicked([!clicked[0], e.target.id]);
    onQueryDelete(e.target.id);
  }

  const getInterviews = (arr) => {
    if (arr){
      for (let r of arr){
        if (week.some(d => r.slice(0,10) === d.slice(0,10))){
          let fieldId = findField(r);
          let btnId = fieldId+'btn';
          let format = [r.slice(8,10)];
          document.getElementById(fieldId).innerHTML=clicked[0] && clicked[1]===btnId ?`<button style="border: 2px solid white; background-color:#b3b7ff; width: 100%; height: 100%" id=${btnId}></button>`:`<button style="border: 2px solid white; background-color:#ebecff; width: 100%; height: 100%" id=${btnId}></button>`;
          document.getElementById(btnId).onclick = toggleClick
        }
      };
    }
  }

  const renderHsAndFields = () => {
    if (hs !== undefined && hs !== null && hs !== false && hs){
      let text = hs.slice(9)
      document.getElementById('H').innerHTML = text;}
    
    if (fields !== undefined && fields !== null && fields !== false && hs){
      document.getElementById('grid').innerHTML = fields;}
    
    if (query !== [] && query !== undefined && query !== null && query !== false && query){
      getInterviews(query);
    }
  }

  renderHsAndFields();

  return (
    <Hour>
      <H id="H"></H>
      <Grid id="grid"></Grid>
    </Hour>
  );
}

export default Hours;