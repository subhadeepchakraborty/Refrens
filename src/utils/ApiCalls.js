import axios from 'axios';

export const URL = '';
export const getData = endPont =>
  axios
    .get(`${URL}${endPont}`, {headers: {'Content-Type': 'application/json'}})
    .then(res => res);
