import React from 'react';
import PropTypes from 'prop-types';



const SavedJokes = ({ savedJokes, deleteJoke }) => (
  <ul className="collection with-header">
    <li className="collection-header"><h5>Saved Jokes</h5></li>
    {
      savedJokes.map(
        (joke, i) => (
            
          <li className="collection-item" key={joke.id}>
            <div>
              <p>{joke.value}</p>
              <button
              type="button"
                  className="secondary-content btn-floating btn-small waves-effect waves-light right"
                  onClick={() => { deleteJoke(joke.id); }}
                >
                  <i className="material-icons">delete</i>
              </button>
              
            </div>
          </li>
        
        ),
      )
    }
  </ul>
);

SavedJokes.propTypes = {
  savedJokes: PropTypes.shape().isRequired,
  deleteJoke: PropTypes.func.isRequired,
};

export default SavedJokes;
