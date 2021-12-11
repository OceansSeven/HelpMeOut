import React, { useState } from "react";
import { specialties, sortByCategories } from '../utils';

function Search({ searchType, feed }) {
  const [keyword, setKeyword] = useState('');
  // const [selectedSpecialty, setSelectedSpecialty] = useState('');
  // const [sortBy, setSortBy] = useState('');
  // console.log('feed: ', feed);

  const handleKeywordSearch = (e) => {
    setKeyword(e.target.value);
    feed = searchType === 'jobs'
      ? feed.filter(card => {
          if (keyword === '') {
            return card;
          } else if (card.description.toLowerCase().includes(keyword.toLowerCase()) || card.title.toLowerCase().includes(keyword.toLowerCase())) {
            return card;
          }
        })
      : feed.filter(card => {
        if (keyword === '') {
          return card;
        } else if (card.firstname.toLowerCase().includes(keyword.toLowerCase()) || card.lastname.toLowerCase().includes(keyword.toLowerCase())) {
          return card;
        }
      })
  };

  const handleSpecialtySearch = (e) => {
    const searchSpecialty = e.target.value;
    if (searchSpecialty === 'All') {return};
    feed = feed.filter(card => {
      if (card.specialties.contains(searchSpecialty)) {
        return card;
      }
    })
    return;
  };

  const handleSortBySearch = (e) => {
    const { sort, compare } = e.target.value;
    if (compare === 'ascending') {
      feed = feed.sort((a, b) => a[sort] - b[sort])
    } else {
      feed = feed.sort((a, b) => b[sort] - a[sort])
    }
  };

  return (
    <div>
      <input type="text" value={keyword} placeholder="Search by keyword..." onChange={handleKeywordSearch} />
      <select onChange={handleSpecialtySearch}>
        {specialties?.map((specialty, i) => <option value={specialty} key={i}>{specialty}</option>)}
      </select>
      {searchType === 'jobs'
        && (
        <select onChange={handleSortBySearch}>
          <option>Sort By</option>
          {sortByCategories?.map((category, i) => <option value={category} key={i}>{category.display}</option>)}
        </select>
      )}
    </div>
  );
}

export default Search;
