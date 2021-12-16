import React, { useState, useContext } from "react";
import { Select, MenuItem, InputLabel, TextField, Grid, Box } from "@material-ui/core";
import { specialties, sortByCategories, filterByKeyword, filterBySpecialty, sortBy } from '../utils';
import MainContext from '../hooks/MainContext.js';

function Search() {
  const { searchFeedType, setSearchFeedData, contractorList, jobsAvailable,
    searchTerm, setSearchTerm, selectedSpecialty, setSelectedSpecialty } = useContext(MainContext);
  const [sortBySelection, setSortBySelection] = useState('');
  let searchFeed = searchFeedType === 'jobs' ? jobsAvailable : contractorList;

  const handleKeywordSearch = (e) => {
    const keyword = e.target.value;
    setSearchTerm(e.target.value);
    setSearchFeedData(filterByKeyword([...searchFeed], keyword));
  };

  const handleSpecialtySearch = (e) => {
    const searchSpecialty = e.target.value;
    setSelectedSpecialty(searchSpecialty);
    if (searchSpecialty === 'All') { return setSearchFeedData(searchFeed); }
    setSearchFeedData(filterBySpecialty([...searchFeed], searchSpecialty));
    setSortBySelection('');
  };

  const handleSortBySearch = (e) => {
    const sortDisplay = e.target.value;
    setSortBySelection(e.target.value);
    const { compare, sort } = sortByCategories.find(category => category.display === sortDisplay);
    setSearchFeedData(sortBy([...searchFeed], sort, compare));
    setSelectedSpecialty('All');
  };

  return (
    <Box id="search-bar-container">
      <div id="search-bar">
        <div id="keyword-search-grid">
          <TextField fullWidth id="keyword-search" label="Search..." variant="outlined" size="small" onChange={handleKeywordSearch} value={searchTerm} />
        </div>
        <div style={{ flexBasis: "40%", display: "flex", justifyContent: "flex-end" }}>
          <div id="specialty-filter-grid">
            <InputLabel id="specialty-dropdown-label">Filter By</InputLabel>
            <Select labelId="specialty-dropdown-label" id="specialty-dropdown" label="Filter By" value={selectedSpecialty} onChange={handleSpecialtySearch} style={{ width: '100%' }}>
              {specialties?.map((specialty, i) => <MenuItem value={specialty} key={i}>{specialty}</MenuItem>)}
            </Select>
          </div>
          {searchFeedType === 'jobs' &&
            (<div id="sort-by-filter-grid">
              <InputLabel id="sort-by-dropdown-label">Sort By</InputLabel>
              <Select labelId="sort-by-dropdown-label" id="sort-by-dropdown" label="Sort By" onChange={handleSortBySearch} style={{ width: '100%' }} value={sortBySelection}>
                {sortByCategories?.map((category, i) => <MenuItem value={category.display} key={i}>{category.display}</MenuItem>)}
              </Select>
            </div>)}
        </div>
      </div>
    </Box>
  );
}

export default Search;
