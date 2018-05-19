import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import axios from './utils/axios';

import {
  fetchPeople,
  addPerson,
  removeAll,
  removeById,
  getPeople
} from './modules/lunch'

import './App.css'

const mapDispatchToProps = {
  fetchPeople, addPerson, removeAll, removeById
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
    this.state = {name: '', group: 1, minSize: 1};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderPeopleList = this.renderPeopleList.bind(this);
    this.handleRemoveAll = this.handleRemoveAll.bind(this);
    this.clearInput = this.clearInput.bind(this);
    this.handleGrouping = this.handleGrouping.bind(this);
    this.makeRandomGroup = this.makeRandomGroup.bind(this);
    this.renderGroupList = this.renderGroupList.bind(this);
  }


  componentWillMount() {
    this.props.fetchPeople();
  }

  handleChange(event, flag) {
    let state = new Object();
    state[flag] = event.target.value;
    console.log('state', state);
    this.setState(state);
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.name) {
      console.log('submit name', this.state.name);
      this.props.addPerson(this.state.name, this.clearInput);
    } else {
      alert('이름을 입력하세요');
    }
    // axios.post(`/api/people`, {name: this.state.value})
    //   .then(res => {
    //     const persons = res.data;
    //     console.log('res.data', persons);
    //     this.setState({ persons });
    //   })
  }

  clearInput() {
    this.setState({
      name: ''
    })
  }

  handleGrouping(event) {
    event.preventDefault();
    const essentialNumber = this.state.group * this.state.minSize;
    if (this.props.people.length < essentialNumber ) {
      alert('불가능!!');
    } else {
      console.log('groupign');
      this.makeRandomGroup();
    }
  }

  makeRandomGroup() {
    // let divder = new Array(this.state.)
    // while()
    let shuffledPeople = new Array(...this.props.people);
    let counter = shuffledPeople.length;
    const minSize = this.state.minSize;
    const group = this.state.group;
    while (counter > 0) {
      // Pick a random index
      let index = Math.floor(Math.random() * counter);

      // Decrease counter by 1
      counter--;

      // And swap the last element with it
      let temp = shuffledPeople[counter];
      shuffledPeople[counter] = shuffledPeople[index];
      shuffledPeople[index] = temp;
    }
    for (let i = 0; i < shuffledPeople.length; i++) {
      console.log(Math.floor(i/minSize));
      if (i < minSize * group) {
        shuffledPeople[i].group = Math.floor(i/minSize);
      } else {
        shuffledPeople[i].group = Math.floor(Math.random() * group);
      }
    }
    console.log('shuffledPeople', shuffledPeople);
    this.setState({
      groupedPeople: shuffledPeople.sort((a, b) => {
        return a.group - b.group
      })
    })
  }

  handleRemoveAll(event) {
    event.preventDefault();
    this.props.removeAll();
  }

  renderPeopleList(people) {
    if (people.length > 0) {
      return people.map((person) => {
        return (
          <div key={person._id}>
            {person.name}
            <button onClick={() => {this.props.removeById(person._id)}}>delete</button>
          </div>
        )
      })
    } else return null
  }

  renderGroupList() {
    const groupedPeople = this.state.groupedPeople;
    const group = this.state.group;
    if (groupedPeople && groupedPeople.length) {
      let groupView = [];
      for(let i = 0; i < group; i++) {
        groupView[i] = (
          <div key={i}>
            <div>Group{i}</div>
            {groupedPeople.filter((person) => {return person.group === i}).map((person) => {
              return (
                <div key={person._id}>
                  {person.name},
                </div>
              )
            })}
          </div>
        )
      }
      return (
        <div className="group-container">
          {groupView}
        </div>
      );
    }
  }

  render () {
    const {
      people
    } = this.props;
    return (
      <div className='container'>
        <h1>Lunch</h1>
        {this.renderPeopleList(people)}
        <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.name || ''} onChange={(event) => {this.handleChange(event, 'name')}} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <button onClick={this.handleRemoveAll}>Delete All</button>
      <form onSubmit={this.handleGrouping}>
      <label>
          Group:
          <input type="number" value={this.state.group} onChange={(event) => {this.handleChange(event, 'group')}} />
      </label>
      <label>
          MinSize:
          <input type="number" value={this.state.minSize} onChange={(event) => {this.handleChange(event, 'minSize')}} />
      </label>
        <input type="submit" value="Submit" />
      </form>
      {this.renderGroupList()}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
