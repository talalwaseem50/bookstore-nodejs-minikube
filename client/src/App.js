import React from 'react';
import logo from './logo.svg';
import './App.css';
import BookDataService from './services/book.service'

export default class PersonList extends React.Component {
  state = {
    sample: ''
  }

  componentDidMount() {
    BookDataService
      .getAll()
      .then(res => {
        console.log(res)
        this.setState({
           sample: res.data.message
        });
      })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
            {this.state.sample}
          </p>
          <p>{window._env_.BOOKSTORE_SERVER_API_URL}:{window._env_.BOOKSTORE_SERVER_API_PORT}</p>
          <p>Hello</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
