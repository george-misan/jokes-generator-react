import React, { Component } from "react";
import axios from "axios";
import {connect} from 'react-redux'
import Savedjokes from "../dashboard/savedJokes";
const form = document.querySelector("form");

class Jokes extends Component {
  state = {
    joke: []
  };

  handleCategoryClick;

  render() {
    const { joke } = this.state;
    return (
      <div className="container">
        <h2 className="center">Welcome to Chuck Norris Jokes</h2>

        <div className="row joke-section">
          <div className="joke card col s12 m7" key={joke.id}>
            <div className="row">
              <div className="card col s12 m6 category z-depth-0">
                <form>
                  <label>Get Jokes by Categories</label>
                  <select className="browser-default">
                    <option value="" disabled selected>
                      Choose your category
                    </option>
                    <option value="1">Sport</option>
                    <option value="2">Political</option>
                    <option value="3">Music</option>
                    <option value="3">Dev</option>
                    <option value="3">Movies</option>
                    <option value="3">Culture</option>
                  </select>

                  <div className="category-cta">
                    <a
                      class="waves-effect waves-light btn right"
                      onClick={() => {
                        axios
                          .get(
                            "https://api.chucknorris.io/jokes/random?political"
                          )
                          .then(response => {
                            console.log(response);
                            this.setState({
                              joke: response.data
                            });
                          });
                      }}
                    >
                      Send
                    </a>
                  </div>
                </form>
              </div>

              <div className="random-jokes card col s12 m5 offset-m1 z-depth-0">
                <label>Get Random Jokes</label>
                <div className="card-content">
                  <span>CLICK THIS BUTTON FOR RANDOM JOKES.</span>
                  <a
                    class="waves-effect waves-light btn right"
                    onClick={() => {
                      {
                        axios
                          .get(
                            "https://api.chucknorris.io/jokes/random?political"
                          )
                          .then(response => {
                            console.log(response);
                            this.setState({
                              joke: response.data
                            });
                          });
                      }
                    }}
                  >
                    random
                  </a>
                </div>
              </div>
            </div>
            <div className="card-content ">
              <p>{joke.value}</p>
              <div className="center">
               
                <a class="btn-floating btn-small waves-effect waves-light light-blue darken-4 right" onClick={this.handleCategoryClick}><i class="material-icons">add</i></a>
              </div>
            </div>
          </div>

          <div className="collection col s12 m4 offset-m1">
            <Savedjokes />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
jokes: state.jokes
})

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(Jokes);
