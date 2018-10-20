import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ListItem from './ListItem.js'
import axios from 'axios';
import loadingGit from './loading.gif';

class App extends Component {
  constructor() {
    super();
    this.state = {
      newToDo: 'handle',
      todos: [
      ],
      edit: false,
      editingIndex: null,
      notification:null,
      loading:true
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.delTodo = this.delTodo.bind(this);
    this.updateToDo = this.updateToDo.bind(this);
    this.editToDo = this.editToDo.bind(this);
    this.generateId = this.generateId.bind(this);
    this.alert = this.alert.bind(this);
    this.apiUrl='https://5bcaea57a2d1240013579b3a.mockapi.io';
  }

  //will be called automatically
  //await has to be used inside a 'async' function
  async componentDidMount(){
    const responses = await axios.get(`${this.apiUrl}/todos`);
    //testing loading
    setTimeout(()=>{
      this.setState({
        todos:responses.data,
        loading:false
      });
    },1000);
  }

  handleChange(event) {
    this.setState(
      {
        newToDo: event.target.value
      }
    )
  }

  generateId() {
    const lastTodo = this.state.todos[this.state.todos.length - 1];
    if (lastTodo) {
      return lastTodo.id + 1;
    }
    return 1;
  }

  async addTodo() {
    const response = await axios.post(`${this.apiUrl}/todos`,{
      name: this.state.newToDo
    });

    const todos = this.state.todos;
    todos.push(response.data);

    this.setState({
      todos: todos,
      newToDo: ''
    });

    this.alert("Todo added succesfully!");
  }

  async delTodo(index) {
    axios.delete(`${this.apiUrl}/todos/${this.state.todos[index].id}`);

    const response = await axios.get(`${this.apiUrl}/todos`);
    this.setState({
      todos:response.data,
      newToDo: ''
    });

    this.alert("TODO deleted successfully");
  }

  editToDo(index) {
    const todo = this.state.todos[index];
    this.setState({
      edit: true,
      newToDo: todo.name,
      editingIndex: index
    });
  }

  async updateToDo() {
    const todo = this.state.todos[this.state.editingIndex];
    const response = await axios.put(`${this.apiUrl}/todos/${todo.id}`,
    {
      name:this.state.newToDo
    });

    const todos = this.state.todos;
    todos[this.state.editingIndex] = response.data;

    this.setState({
      todos: todos,
      edit: false,
      editingIndex: null
    });

    this.alert("todo update successfully!!");
  }

  alert(notification){
    this.setState({
      notification
    });

    setTimeout(()=>{
      this.setState({
      notification:null
    });},2000);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>

        <div className="container">
        {
          this.state.notification &&
          <div className="alert mt-3 alert-success">
            <p className="text-center">{this.state.notification}</p>
          </div>
        }
        </div>

        <div className="container">
          <input
            type="text"
            name="todo"
            className="my-4 form-control"
            placeholder="add a new todo"
            onChange={this.handleChange}
            value={this.state.newToDo}
          />

          <button 
            className="btn-success mb-3 form-control" 
            onClick={this.state.edit ? this.updateToDo : this.addTodo}
            disabled={this.state.newToDo.length< 5}
          >
            {this.state.edit ? "update to do" : "add todo"}
          </button>

          {
            this.state.loading && 
            <img src={loadingGit} alt="" />
          }

          {/* <h2 className="text-center p-4">Todo Apps</h2> */}
          {
            (!this.state.edit || this.state.loading) &&
            <ul className="list-group">
              {this.state.todos.map((item, index) => {
                return <ListItem
                  key={item.id}
                  item={item}
                  editTodo={()=>{this.editToDo(index);}}
                  delTodo={()=>{this.delTodo(index);}}
                />
              })}
            </ul>
          }
        </div>

      </div>
    );
  }
}

export default App;
