import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      data: []
    };

    this.state = { username: '' };

  }
  mySubmitHandler = (event) => {
    event.preventDefault();
    alert("Delete ID " + this.state.username + " Success");

    var xhr = new XMLHttpRequest()

    xhr.addEventListener('load', () => {
      console.log(xhr.responseText)
    })
    xhr.open('GET', 'http://localhost:3100/users/delete?id='+ this.state.username)
    xhr.send()
    document.location.reload(true)
  }

  myChangeHandler = (event) => {
    this.setState({ username: event.target.value });
  }

  componentDidMount() {
    fetch("http://localhost:3100/users")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            data: result.data
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  render() {
    const { error, isLoaded, data } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <center>
          <br></br>
          <div class="alert alert-danger" role="alert">
            <h2>Enter ID to Delete</h2>
          </div>
          <form onSubmit={this.mySubmitHandler}>
            <input
              type='text'
              onChange={this.myChangeHandler}
            />
            <input
              type='submit'
            />
          </form>

          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div class="alert alert-warning" role="alert">
            <h2>User Information</h2>
          </div>
          <br></br>
          <ul>
            {data.map(item => (
              <h4>  <span class="badge badge-primary">ID {item.userid}</span> {item.firstname} {item.lastname}  {item.villageID}  {item.villageName}  {item.Subdistrict} {item.District} {item.Province} {item.zipcode} <span class="badge badge-secondary"></span></h4>
            ))}
          </ul>
        </center >
      );
    }
  }


}

export default App;