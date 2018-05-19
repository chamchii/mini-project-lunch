import axios from './axios';

export function fetchPeople () {
    console.log('api fetch')
    return axios.get(`/api/people`)
}
