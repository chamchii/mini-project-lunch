import axios from './axios';

export function fetchPeople () {
    return axios.get('/api/people')
}

export function addPerson(name) {
    return axios.post('/api/people', {name: name})
}

export function removeAll() {
    return axios.delete('/api/people')
}

export function removeById(id) {
    return axios.delete(`/api/person/${id}`)
}