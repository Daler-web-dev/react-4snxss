import React from 'react';
import { Rating } from 'react-simple-star-rating';

const RatingComponent = (props) => {
  return (
    <div className="genre-item">
      <input
        type="checkbox"
        onChange={(e) => props.onChangeFilter(e, props.item)}
      />
      <Rating
        initialValue={props.item}
        iconsCount={10}
        size={20}
        readonly={true}
      />
    </div>
  );
};

export default RatingComponent;
