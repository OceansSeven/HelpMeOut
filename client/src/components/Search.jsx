import React, { useState } from "react";
import { specialties, sortByCategories } from '../utils';

function Search({ searchType, feed }) {
  const [keyword, setKeyword] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [sortBy, setSortBy] = useState('');

  const handleKeywordSearch = (e) => {
    const searchTerm = e.target.value;
    feed = searchType === 'jobs'
      ? feed.filter(card => {
          if (searchTerm === '') {
            return card;
          } else if (card.description.toLowerCase().includes(searchTerm.toLowerCase()) || card.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return card;
          }
        })
      : feed.filter(card => {
        if (searchTerm === '') {
          return card;
        } else if (card.firstName.toLowerCase().container(searchTerm.lowerCase()) || card.lastName.toLowerCase().container(searchTerm.lowerCase())) {
          return card;
        }
      })
  };

  const handleSpecialtySearch = (e) => {
    const searchSpecialty = e.target.value;
    feed = feed.filter(card => {
      if (card.specialties.includes(searchSpecialty)) {
        return card;
      }
    })
  };

  const handleSortBySearch = (e) => {
    const searchSortBy = e.target.value;
    feed = feed.sort()
  };

  return (
    <div>
      <input type="text" value={keyword} placeholder="Search by keyword..." onChange={handleKeywordSearch} />
      <select onChange={handleSpecialtySearch}>
        {specialties.map((specialty, i) => <option value={specialty} key={i}>{specialty}</option>)}
      </select>
      {searchType === 'jobs'
        && (
        <select onChange={handleSortBySearch}>
          {sortByCategories.map((category, i) => <option value={category} key={i}>{category}</option>)}
        </select>
      )}
    </div>
  );
}