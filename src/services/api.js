import axios from 'axios';

const API_KEY = '29377989-ce3619f612f3ee2439940f074';
axios.defaults.baseURL = 'https://pixabay.com/api/';


export const getImages = async (query, page) => {
  console.log(page, query);
  const response  = await axios.get(`?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
  console.log(response);
  return response.data;
};