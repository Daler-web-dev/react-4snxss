import React from 'react';

const GenreComponent = ({ item, onChangeFilter }) => {
  return (
    <div className="genre-item">
      <input type="checkbox" onChange={(e) => onChangeFilter(e, item)} />
      <span>{item}</span>
    </div>
  );
};

export default GenreComponent;
