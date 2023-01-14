import React, { useMemo, useState } from 'react';
import GenreComponent from '../components/GenreComponent';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

const Select = ({ title, arr, ChilComponent, setFilterData }) => {
  const [isOpen, setIsOpen] = useState(false);
  let temp = [];

  const onChangeFilter = (e, data) => {
    const isTrue = e.target.checked;

    if (isTrue) {
      temp = [...temp, data];
    } else {
      temp = temp.filter((el) => el !== data);
    }

    setFilterData(temp);
  };

  return (
    <div className="custom-select">
      <div className="select-button" onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
        {isOpen ? <BsChevronUp /> : <BsChevronDown />}
      </div>
      {isOpen ? (
        <div className="list">
          <div className="genre-item">
            <input onChange={(e) => onChangeFilter(e, 'all')} type="checkbox" />{' '}
            <span>any {title}</span>
          </div>
          {arr.length === 0 ? (
            <span>there is nothing</span>
          ) : (
            arr.map((item, idx) => (
              <ChilComponent
                key={idx}
                item={item}
                onChangeFilter={onChangeFilter}
              />
            ))
          )}
        </div>
      ) : null}
    </div>
  );
};

export const SelectMemoized = React.memo(Select);
