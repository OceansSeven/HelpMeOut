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
  };

  const handleSortBySearch = (e) => {
    const sortDisplay = e.target.value;
    setSortBySelection(e.target.value);
    const { compare, sort } = sortByCategories.find(category => category.display === sortDisplay);
    setSearchFeedData(sortBy([...searchFeed], sort, compare));
  };

  return (
    <Box id="search-bar-container">
      <Grid id="search-bar" container spacing={2}>
        <Grid item xs={4} md={8} id="keyword-search-grid">
          <TextField fullWidth id="keyword-search" label="Search..." variant="outlined" size="small" onChange={handleKeywordSearch} value={searchTerm} />
        </Grid>
        <Grid item xs={4} md={2} id="specialty-filter-grid">
          <InputLabel id="specialty-dropdown-label" style={{ color: '#f0ebd8' }}>Filter By</InputLabel>
          <Select labelId="specialty-dropdown-label" id="specialty-dropdown" label="Filter By" value={selectedSpecialty} onChange={handleSpecialtySearch} style={{ width: '100%', color: '#f0ebd8' }}>
            {specialties?.map((specialty, i) => <MenuItem value={specialty} key={i}>{specialty}</MenuItem>)}
          </Select>
        </Grid>
        {searchFeedType === 'jobs'
          && (
          <Grid item xs={4} md={2} id="sort-by-filter-grid">
            <InputLabel id="sort-by-dropdown-label" style={{ color: '#f0ebd8' }}>Sort By</InputLabel>
            <Select labelId="sort-by-dropdown-label" id="sort-by-dropdown" label="Sort By" onChange={handleSortBySearch} style={{ width: '100%', color: '#f0ebd8' }} value={sortBySelection}>
              {sortByCategories?.map((category, i) => <MenuItem value={category.display} key={i}>{category.display}</MenuItem>)}
            </Select>
          </Grid>
        )}
      </Grid>
    </Box>
  );
}

export default Search;
