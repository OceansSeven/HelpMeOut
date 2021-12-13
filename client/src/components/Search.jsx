import React, { useState, useContext } from "react";
import { specialties, sortByCategories, filterByKeyword, filterBySpecialty, sortBy } from '../utils';
import MainContext from '../hooks/MainContext.js';

function Search() {
  const { searchFeedData, searchFeedType, setSearchFeedData, contractorList,
    jobsAvailable, searchTerm, setSearchTerm, selectedSpecialty, setSelectedSpecialty } = useContext(MainContext);
  let searchFeed = searchFeedType === 'jobs' ? jobsAvailable : contractorList;

  const handleKeywordSearch = (e) => {
    const keyword = e.target.value;
    setSearchTerm(e.target.value);
    setSearchFeedData(filterByKeyword([...searchFeed], keyword));
  };

  const handleSpecialtySearch = (e) => {
    const searchSpecialty = e.target.value;
    if (searchSpecialty === 'All') { return setSearchFeedData(searchFeed); }
    setSearchFeedData(filterBySpecialty([...searchFeed], searchSpecialty));
    setSelectedSpecialty(searchSpecialty);
  };

  const handleSortBySearch = (e) => {
    const sortDisplay = e.target.value;
    const { compare, sort } = sortByCategories.find(category => category.display === sortDisplay);

    setSearchFeedData(sortBy([...searchFeed], sort, compare));
  };

  return (
    <div>
      <input type="text" placeholder="Search by keyword..." onChange={handleKeywordSearch} value={searchTerm} />
      <select id="specialtyDropdown" value={selectedSpecialty} onChange={handleSpecialtySearch}>
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
