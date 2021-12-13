import axios from 'axios';

export const specialties = ['All', 'Appliance Repair', 'Carpentry', 'Electrical', 'HVAC', 'Landscaping', 'Mechanic', 'Plumbing', 'Snow/Waste Removal'];

export const sortByCategories = [
  { display: 'Newest First', sort: 'date', compare: 'ascending'},
  { display: 'Oldest First', sort: 'date', compare: 'descending'},
  { display: 'Price: Low to High', sort: 'price_per_hour', compare: 'ascending'},
  { display: 'Price: High to Low', sort: 'price_per_hour', compare: 'descending'}
];

export async function getUser (userId) {
  return (await axios.get(`/api/user/${userId}`)).data;
}

export async function getContractors () {
  return (await axios.get('/api/contractors')).data;
}

export async function getJobs () {
  return (await axios.get('/api/jobs')).data;
}

export function filterByKeyword(feed, keyword) {
  const filterFunc = (obj) => {
    if (keyword === '') return obj;
    for (let prop in obj) {
      if (Array.isArray(obj[prop])) {
        for (let i = 0; i < obj[prop].length; i++) {
          if (obj[prop][i].toString().toLowerCase().includes(keyword.toLowerCase())) return obj;
        }
      } else if (typeof obj[prop] === 'object') {
        const nestedObj = obj[prop];
        for (let nestedProp in nestedObj) {
          if (nestedObj[nestedProp].toString().toLowerCase().includes(keyword.toLowerCase())) return obj;
        }
      } else if (obj[prop].toString().toLowerCase().includes(keyword.toLowerCase())) return obj;
    }
  }

  return feed.filter(filterFunc)
}

export function filterBySpecialty(feed, specialty) {
  return feed.filter(card => {
    if (card.specialties.includes(specialty)) {
      return card;
    }
  })
}

export function sortBy(feed, sort, compare) {
  let sorted = feed.sort((a, b) => {
    return a[sort] - b[sort];
  });

  if (sort === 'date') {
    sorted = feed.sort((a, b) => {
      console.log(sort, Date(a[sort]));
      return Date(a[sort]) - Date(b[sort]);
    })
  }

  return compare === 'ascending' ? sorted : sorted.reverse();
  // if (compare === 'ascending') {
  //   return feed.sort((a, b) => {
  //     return a[sort] - b[sort];
  //   })
  // } else {
  //   return feed.sort((a, b) => {
  //     return b[sort] - a[sort];
  //   })
  // }
}