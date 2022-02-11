import { useState } from 'react';
import './App.css';
import Axios from 'axios';


function App() {

  const [name,setName] = useState("");
  const [section,setSection] = useState("");
  const [branch,setBranch] = useState("");
  const [roll,setRoll] = useState(0);

  const [newRoll,setNewRoll] = useState(0);

  const [studentList,setStudentList] = useState([]);

  const addStudent = () => {
    Axios.post('http://localhost:3001/create', {
      name:name,
    section: section,
    branch: branch,
    roll: roll}).then(()=>{
      setStudentList([...studentList,{
        name:name,
    section: section,
    branch: branch,
    roll: roll
      }]);
    });

  };

  const getStudents = () => {
    Axios.get("http://localhost:3001/students")
    .then((response)=>{
      setStudentList(response.data);
    });
  }
  const updateStudentRoll = (id)=> {
    Axios.put("http://localhost:3001/update",{roll: newRoll, id: id}).then((response)=>{
      setStudentList(studentList.map((val)=>{
        return val.id == id ? {id:val.id, name: val.name, section: val.section, branch: val.branch, roll: newRoll}: val;
      }));
    });
  };

  const deleteStudent = (id) => {
    Axios.delete('http://localhost:3001/delete/${id}').then((response)=>{
      setStudentList(studentList.filter((val)=>{
        return val.id != id;
      }));
    });
  };

  return (
    <div className="App">
      <div className="information">
      <label>Name:</label>
      <input type="text" onChange={(event) => {setName(event.target.value)}}/>
      <label>Section:</label>
      <input type="text"onChange={(event) => {setSection(event.target.value)}}/>
      <label>Branch:</label>
      <input type="text"onChange={(event) => {setBranch(event.target.value)}}/>
      <label>Roll:</label>
      <input type="number"onChange={(event) => {setRoll(event.target.value)}}/>
      <button onClick={addStudent}>Save</button>
      </div>

      <div className="students">
      <button onClick={getStudents}>Show Students</button>

      {studentList.map((val,key)=>{
        return <div className="student">
          <div> 
          <h3>Name:{val.name}</h3>
          <h3>Section:{val.section}</h3>
          <h3>Branch:{val.branch}</h3>
          <h3>Roll:{val.roll}</h3>
          </div>

          <div>
          <input type="text" placeholder='100'
          onChange={(event) => {setNewRoll(event.target.value)}}/>
          <button onClick={()=> {updateStudentRoll(val.id);}}>Update</button>
          <button onClick={()=> {deleteStudent(val.id);}}>Delete</button>
          </div>
          
          </div>
      })}
      </div>

    </div>
  );
}

export default App;
