import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/api/current_user');
  
  dispatch({type: FETCH_USER, payload: res});
};
  // const request = axios.get('/api/current_user');

  // return {
  //   type: FETCH_USER,
  //   payload: request
  // };