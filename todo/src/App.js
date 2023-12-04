import {useState} from 'react';
import AddTaskForm from './components/AddTaskForm.jsx';
import UpdateForm from './components/UpdateForm.jsx';
import ToDo from './components/ToDo.jsx';

import 'bootstrap/dist/css/bootstrap.min.css';

import './App.css';

function App() {

  

  // Tasks (ToDo List) State
  const [toDo, setToDo] = useState([
    {id: 1, title: 'cars', body: '...', status: false, subTodo: []},
    {id: 2, title: 'jobs', body: '...', status: false, subTodo: []},
    {id: 3, title: 'toys', body: '...', status: false, subTodo: []}
  ]);


      
  // Temp State
  const [newTask, setNewTask] = useState('');
  const [newBody, setNewBody] = useState('');
  const [updateData, setUpdateData] = useState('');


  // Add task 
  ///////////////////////////
  const addTask = () => {
    if(newTask && newBody) {
      let num = toDo.length + 1; 
      let newEntry = { id: num, title: newTask, body: newBody, status: false, subTodo: [] }
      console.log(newEntry);
      setToDo([...toDo, newEntry])
      setNewTask('');
    }
  }

  // Delete task 
  ///////////////////////////
  const deleteTask = (id) => {
    let newTasks = toDo.filter( task => task.id !== id)
    setToDo(newTasks);
  }

  // Mark task as done or completed
  ///////////////////////////
  const markDone = (id) => {
    let newTask = toDo.map( task => {
      if( task.id === id ) {
        return ({ ...task, status: !task.status })
      }
      return task;
    })
    setToDo(newTask);
  }

  // Cancel update
  ///////////////////////////
  const cancelUpdate = () => {
    setUpdateData('');
  }

  // Change task for update
  ///////////////////////////
  const changeTask = (e) => {
    let newEntry = {
      id: updateData.id,
      title: e.target.value,
      body: updateData.body,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
  }

  const changeBody = (e) => {
    let newEntry = {
      id: updateData.id,
      title: updateData.title,
      body: e.target.value,
      status: updateData.status ? true : false
    }
    setUpdateData(newEntry);
  }

  // Update task
  ///////////////////////////
  const updateTask = () => {
    let filterRecords = [...toDo].filter( task => task.id !== updateData.id );
    let updatedObject = [...filterRecords, updateData]
    setToDo(updatedObject);
    setUpdateData('');
  }

  return (
    <div className="container App">

    <br /><br />
    <h2>To Do List App (ReactJS)</h2>
    <br /><br />

    {updateData && updateData ? (
      <UpdateForm 
        updateData={updateData}
        changeBody={changeBody}
        changeTask={changeTask}
        updateTask={updateTask}
        cancelUpdate={cancelUpdate}
      />
    ) : (
      <AddTaskForm 
        newTask={newTask}
        setNewTask={setNewTask}
        newBody={newBody}
        setNewBody={setNewBody}
        addTask={addTask}
      />
    )}

    {/* Display ToDos */}

    {toDo && toDo.length ? '' : 'No Tasks...'}

    <ToDo
      toDo={toDo}
      markDone={markDone}
      setUpdateData={setUpdateData}
      deleteTask={deleteTask}
    />  

    </div>
  );
}

export default App;
