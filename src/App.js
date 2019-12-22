import React,{useState, useEffect} from 'react';


function Todo({index,todo,doAction}){
  return(
    <div className="todo" >
      <input type="checkbox" checked={todo.isCompleted ? true : false }  onChange={e=>doAction(e.target.checked, index)} />
      <div style={{textDecoration: todo.isCompleted ? 'line-through' : 'none',display:'inline' }}>{todo.text}</div>
      
    </div>
  )

}


function TodoForm({addTodo}){
  const [value,setValue] = useState('');

  const handleSubmit = e =>{
    e.preventDefault();
     if(!value)
     return;
     addTodo(value);
     setValue('');
  }
  return(

    
    <form onSubmit={handleSubmit}>
      <div className="form-group" >
      <input type="text" className="form-control" id="todo"  value={value} onChange={e=>setValue(e.target.value)}/>
    </div>
    </form>
  )
 
}

function App() {

    const preList = localStorage.getItem('todos') ? JSON.parse(localStorage.getItem('todos')) : []
    const[todos,setTodos]  = useState(preList);

    useEffect(()=>{
      console.log('added......');
      localStorage.setItem('todos',JSON.stringify(todos) );
    },[todos]);


    const addTodo = text =>{
      const  newTodos = [...todos, {text:text, isCompleted:false}];
      console.log(newTodos);
      setTodos(newTodos);
    }
    const handleAction = (value,index) => {
      const  newTodos = [...todos];
      newTodos[index].isCompleted = value
      setTodos(newTodos);
    }

  return(
    <div className="app">
      <h1>Welcome to To Do List</h1>
      <div className='todo-list'>
        {
          todos.map((todo,index) => (
            <Todo key={index} index={index} todo={todo} doAction={handleAction}/>
        ))

        }
        <TodoForm addTodo={addTodo} />
      </div> 

    </div>
  )
}

export default App;
