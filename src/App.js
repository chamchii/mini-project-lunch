import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from './utils/axios';

import {
  fetchPeople,
  getPeople
} from './modules/lunch'

import './App.css'

const mapDispatchToProps = {
  fetchPeople
}

const mapStateToProps = state => ({
  people: getPeople(state)
})

class App extends React.Component {
  static propTypes = {
    people: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {name: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderPeopleList = this.renderPeopleList.bind(this);
  }


  componentWillMount() {
    this.props.fetchPeople();
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    axios.post(`/api/people`, {name: this.state.value})
      .then(res => {
        const persons = res.data;
        console.log('res.data', persons);
        this.setState({ persons });
      })
  }

  renderPeopleList(people) {
    if (people.length > 0) {
      return people.map((person) => {
        return (
          <div>
            {person.name}
          </div>
        )
      })
    } else return null
    
  }

  render () {
    const {
      people
    } = this.props;
    console.log(this.props.people)
    console.log('render people', people);
    return (
      <div className='container'>
        <h1>Lunch</h1>
        {people.length > 0 && people.map((person) => {
          return (
          <div key={person._id}>
            {person.name}
          </div>)
        })}
        <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.value || ''} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
