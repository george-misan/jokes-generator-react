import React from 'react';
import PropTypes from 'prop-types';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function CategoryPicker({ onChange, onClick, category }) {
  const options = [
    'animal',
    'career',
    'celebrity',
    'dev',
    'explicit',
    'fashion',
    'food',
    'history',
    'money',
    'movie',
    'music',
    'political',
    'religion',
    'science',
    'sport',
    'travel',
  ];

  return (
    <form>
      <label>Get Jokes by Categories</label>
      <select className="browser-default" onChange={onChange}>
        <option value="" disabled selected>Choose your category</option>
        {
          options
            .map((cat) => (
              <option
                value={cat}
                key={cat}
              >
                {capitalizeFirstLetter(cat)}
              </option>
            ))
        }
      </select>
      <div className="category-cta">
        <button
          id="select"
          type="button"
          className="waves-effect waves-light btn right"
          onClick={() => onClick(category)}
          disabled={!category}
        >
        Send
        </button>
      </div>
    </form>
  );
}

CategoryPicker.propTypes = {
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  category: PropTypes.string.isRequired,
};
