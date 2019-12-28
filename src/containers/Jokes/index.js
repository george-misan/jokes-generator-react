import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import SavedJokes from '../../components/SavedJokes';
import {
  setJokeRandomAction,
  setLoadingAction,
  setCategorizedJokeAction,
  setSavedJokesAction,
} from './actions';
import CategoryPicker from '../../components/CategoryPicker';

class Jokes extends Component {
  state = {
    category: '',
    currentTab: '',
  }

  componentDidMount() {
    const { setSavedJokes } = this.props;
    this.setState({ currentTab: 'cat' });
    try {
      const savedJokes = localStorage.getItem('jokes');
      if (savedJokes) {
        setSavedJokes(JSON.parse(savedJokes));
      }
    } catch (error) {
      // notify user of error
      console.log(error);
    }
  }

  fetchJoke = async (param) => {
    const { setRandomJoke, setLoading, setCategorizedJoke } = this.props;
    const url = `https://api.chucknorris.io/jokes/random${typeof param === 'string' ? `?category=${param}` : ''}`;
    setLoading(true);
    try {
      const { data } = await axios.get(url);
      if (typeof param === 'string') setCategorizedJoke(data);
      else setRandomJoke(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ category: value });
  }

  saveJoke = () => {
    const { currentTab } = this.state;
    const {
      jokes: {
        randomJoke,
        savedJokes,
        categorizedJoke,
      },
    } = this.props;

    let jokesToSave = [];

    if (currentTab === 'cat' && categorizedJoke.id) {
      jokesToSave = savedJokes.concat(categorizedJoke);
    }

    if (currentTab === 'random' && randomJoke.id) {
      jokesToSave = savedJokes.concat(randomJoke);
    }

    this.saveToLocalStorage(jokesToSave);
  }

  saveToLocalStorage = (jokesToSave) => {
    const { setSavedJokes } = this.props;
    try {
      localStorage.setItem('jokes', JSON.stringify(jokesToSave));
      setSavedJokes(jokesToSave);

    } catch (error) {
      // notify user when error occur
      console.log(error);
    }
  }

  deleteJoke = (id) => {
    const { jokes: { savedJokes } } = this.props;
    const jokes = savedJokes.filter((joke) => joke.id !== id);
    this.saveToLocalStorage(jokes);
  }

  setCurrentTab = (tab) => {
    this.setState({ currentTab: tab });
  }

  render() {
    const { category } = this.state;
    const {
      jokes: {
        randomJoke,
        savedJokes,
        loading,
        categorizedJoke,
      },
    } = this.props;

    return (
      <div className="container">
        <h2 className="center">Welcome to Chuck Norris Jokes</h2>
        <div className="row joke-section ">
          <div className="joke card col s12 m8 ">
            <div className="col s12 ">
              <ul className="tabs">
                <li className="tab col s6">
                  <Link
                    to="#categorylink"
                    className="indigo-text text-darken-4"
                    onClick={() => this.setCurrentTab('cat')}
                  >
                  Categorized Jokes
                  </Link>
                </li>
                <li className="tab col s6">
                  <Link
                    to="#randomlink"
                    className="indigo-text text-darken-4"
                    onClick={() => this.setCurrentTab('random')}
                  >
                  Random Jokes
                  </Link>
                </li>
              </ul>
              <div className="col s12" id="categorylink">
                <p className="flow-text indigo-text text-darken-4">CATEGORIZED JOKES</p>
                {
                  loading ? (
                    <div className="progress">
                      <div className="indeterminate" />
                    </div>
                  )
                    : (
                      <p className="joke-content">
                        {categorizedJoke.value}
                      </p>
                    )
                }
                <CategoryPicker
                  category={category}
                  onChange={this.handleChange}
                  onClick={this.fetchJoke}
                />
              </div>
              <div className="col s12" id="randomlink">
                <p className="flow-text indigo-text text-darken-4">RANDOM JOKES</p>
                {
                  loading ? (
                    <div className="progress">
                      <div className="indeterminate" />
                    </div>
                  )
                    : (
                      <p className="joke-content">
                        {randomJoke.value}
                      </p>
                    )
                }
                <button
                  type="button"
                  className="waves-effect waves-light btn right"
                  onClick={this.fetchJoke}
                  disabled={loading}
                >
                    random
                </button>
              </div>
            </div>
            <div className="card-content ">
              <div className="center">
                <button
                  type="button"
                  className="btn-floating btn-small waves-effect waves-light right"
                  onClick={this.saveJoke}
                >
                  <i className="material-icons">add</i>
                </button>
              </div>
            </div>
          </div>
          <div className="collection col s12 m3 offset-m1">
            <SavedJokes
              savedJokes={savedJokes}
              deleteJoke={this.deleteJoke}
            />
          </div>
        </div>
      </div>
    );
  }
}

Jokes.propTypes = {
  jokes: PropTypes.shape({
    randomJoke: PropTypes.object.isRequired,
    savedJokes: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    categorizedJoke: PropTypes.object.isRequired,
  }).isRequired,
  setRandomJoke: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setCategorizedJoke: PropTypes.func.isRequired,
  setSavedJokes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  jokes: state.jokes,
});

const mapDispatchToProps = (dispatch) => ({
  setRandomJoke: (joke) => dispatch(setJokeRandomAction(joke)),
  setCategorizedJoke: (joke) => dispatch(setCategorizedJokeAction(joke)),
  setSavedJokes: (jokes) => dispatch(setSavedJokesAction(jokes)),
  setLoading: (loading) => dispatch(setLoadingAction(loading)),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect)(Jokes);
