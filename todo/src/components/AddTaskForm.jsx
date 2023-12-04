const AddTaskForm = ({ newTask, setNewTask, newBody, setNewBody, addTask }) => {
  return( 
    <>
      {/* Add Task */}
      <div className="row">
        <div className="col d-flex gap-5">
          <input 
            value={newTask}
            onChange={ (e) => setNewTask(e.target.value)}
            className="form-control form-control-lg"
            placeholder="title"
          />
          <input 
            value={newBody}
            onChange={ (e) => setNewBody(e.target.value)}
            className="form-control form-control-lg"
            placeholder="body"
          />
        </div>
        <div className="col-auto">
          <button
            onClick={addTask}
            className="btn btn-lg btn-success"
          >Add Task</button>
        </div>
      </div>
      <br />
    </>
  )
}

export default AddTaskForm;