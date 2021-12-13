import React, { useState, useContext } from "react";
import { specialties, sortByCategories } from '../utils';
import MainContext from '../hooks/MainContext.js';

function Search() {
  const { searchFeedData, searchFeedType, setSearchFeedData, contractorList, jobsAvailable } = useContext(MainContext);

  const handleKeywordSearch = (e) => {
    const keyword = e.target.value;
    let searchFeed = searchFeedType === 'jobs' ? jobsAvailable : contractorList;

    setSearchFeedData(searchFeed.filter(card => {
      if (keyword === '') return card;
      if (searchFeedType === 'jobs' && (card.description.toLowerCase().includes(keyword.toLowerCase()) || card.title.toLowerCase().includes(keyword.toLowerCase()))) {
        return card;
      } else if (searchFeedType === 'contractors' && (card.firstname.toLowerCase().includes(keyword.toLowerCase()) || card.lastname.toLowerCase().includes(keyword.toLowerCase()))) {
        return card;
      }
    }))
  };

  const handleSpecialtySearch = (e) => {
    const searchSpecialty = e.target.value;
    let searchFeed = searchFeedType === 'jobs' ? jobsAvailable : contractorList;

    if (searchSpecialty === 'All') { return setSearchFeedData(searchFeed); }
    setSearchFeedData(searchFeed.filter(card => {
      if (card.specialties.includes(searchSpecialty)) {
        return card;
      }
    }));
  };

  const handleSortBySearch = (e) => {
    const sortCategory = e.target.value;
    const { compare, sort } = sortByCategories.find(category => category.display === sortCategory);
    let searchFeed = searchFeedType === 'jobs' ? jobsAvailable : contractorList;

    if (compare === 'ascending') {
      setSearchFeedData([...searchFeed].sort((a, b) => {
        return a[sort] - b[sort];
      }))
    } else {
      setSearchFeedData([...searchFeed].sort((a, b) => {
        return b[sort] - a[sort];
      }))
    }
  };

  return (
    <div>
      <input type="text" placeholder="Search by keyword..." onChange={handleKeywordSearch} />
      <select onChange={handleSpecialtySearch}>
        {specialties?.map((specialty, i) => <option value={specialty} key={i}>{specialty}</option>)}
      </select>
      {searchFeedType === 'jobs'
        && (
        <select onChange={handleSortBySearch}>
          <option>Sort By</option>
          {sortByCategories?.map((category, i) => <option value={category.display} key={i}>{category.display}</option>)}
        </select>
      )}
    </div>
  );
}

export default Search;
