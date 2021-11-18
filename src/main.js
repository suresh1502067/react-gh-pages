import React, { Component } from 'react'
import json from './json'

import './App.css'
const person = [
  {
    name: 'Jim',
    color: 'blue',
    age: 22,
  },
  {
    name: 'Sam',
    color: 'blue',
    age: 33,
  },
  {
    name: 'Eddie',
    color: 'green',
    age: 77,
  },
];

export default class Main extends Component {
  constructor (props) {
    super(props)
    this.state = {
      orgjson: json,
      countryname: [],
      communicating: 0,
      monthstate: [],
      sampledata: []
    }
  }

  componentDidMount () {
    // let myArray = ['a', 'b', 'a', 'b', 'c', 'e', 'e', 'c', 'd', 'd', 'd', 'd']
    // let myOrderedArray = myArray.reduce(function (accumulator, currentValue) {
    //   console.log('accumulator.indexOf(currentValue)', accumulator.indexOf(currentValue), 'accumulator', accumulator)
    //   if (accumulator.indexOf(currentValue) === -1) {
    //     accumulator.push(currentValue)
    //   }
    //   return accumulator
    // }, [])

    // console.log(myOrderedArray)

    
    // Group by color as key to the person array
    const personGroupedByColor = this.groupBy(person, 'color');

    console.log("personGroupedByColor",personGroupedByColor)

    let onetimesname = [
      ...new Set(
        json.map((data, index) => {
          return data.name
        })
      )
    ]
    console.log('onetimesnameonetimesname', onetimesname)

    var cars = json
    var months = cars.reduce(function (r, a) {
      console.log('r', r, a)
      // r = {}
      r[a.name] = r[a.name] || []
      console.log('r[a.name]', r[a.name])
      r[a.name].push(a)

      return r
    }, Object.create(null))

    let onescorecovert = []

    this.setState({ countryname: onetimesname })

    let totaladdvalues = onetimesname.filter((data, indexfirst) => {
      if (months[data].length >= 2) {
        let addvalue = []

        return months[data].map((datavalues, index) => {
          if (datavalues.hasOwnProperty('id')) {
            addvalue = [...addvalue, { ...datavalues.scores }]
          }
          console.log('addvcalues', addvalue)
          months = {
            ...months,
            [datavalues.name]: [{ ...months[datavalues.name][0], scores: [...addvalue] }]
          }
        })
      }
    })

    this.setState({ monthstate: months })

    let monthvalue = []

    let addmonthvalue = onetimesname.filter((name, index) => {
      return months[name].map((datavalues, index1) => {
        if (datavalues.scores.length >= 2) {
          let orginalvalues = {}
          datavalues.scores.map((data, name) => {
            Object.keys(data).forEach(key => {
              console.log('--------------------------------------------->', `${key} : ${data[key]}`, {
                [key]: data[key]
              })
              if ([key] in orginalvalues) {
                orginalvalues = { ...orginalvalues, [key]: parseInt(orginalvalues[key]) + data[key] }
              } else {
                orginalvalues = { ...orginalvalues, [key]: data[key] }
              }
            })
          })
          // monthvalue.push(orginalvalues)
          // console.log('objectdsfdsfdsfdsfdsf', monthvalue)
          months = {
            ...months,
            [datavalues.name]: [{ ...months[datavalues.name][0], scores: orginalvalues }]
          }
          this.setState({ sampledata: [...this.state.sampledata, orginalvalues] })
        }
      })
    })
    console.log('objectdsfdsfdsfdsfdsf', months)
    // onkeydown="javascript: return event.keyCode == 69 ? false : true"
    this.setState({ sampledata: months })

    let keysvalue = Object.keys(months)

    let singlearraymake = []
    keysvalue.map(data => {
      return months[data].map((monthslist, datavalues) => {
        return (singlearraymake = [...singlearraymake, { ...monthslist }])
      })
    })

    let ascendingorder = singlearraymake.sort(function (a, b) {
      return a.isoCode - b.isoCode
    })
    this.setState({ sampledata: ascendingorder })
  }
   groupBy = (array, key) => {
    // Return the end result
    return array.reduce((result, currentValue) => {
      // console.log("resuyyyy",result)
      // If an array already present for key, push it to the array. Else create an array and push the object
      (result[currentValue[key]] = result[currentValue[key]] || []).push(
        currentValue
      );
      // console.log("resul------------------->",result[currentValue[key]],'currentValue',currentValue,"result",result)
      // Return the current iteration `result` value, this will be taken as next iteration `result` value and accumulate
      return result;
    }, {}); // empty object is the initial value for result object
  };
  scorelist = scorelist => {
    return scorelist.map((scoreslist, index) => {
      return (
        <span>
          <td>{scoreslist.communicating ? scoreslist.communicating : null}</td>
          <td>{scoreslist.evaluating ? scoreslist.evaluating : null}</td>
          <td>{scoreslist.leading ? scoreslist.leading : null}</td>
          <td>{scoreslist.deciding ? scoreslist.deciding : null}</td>
          <td>{scoreslist.trusting ? scoreslist.trusting : null}</td>
          <td>{scoreslist.disagreeing ? scoreslist.disagreeing : null}</td>
          <td>{scoreslist.scheduling ? scoreslist.scheduling : null}</td>
          <td>{scoreslist.persuading ? scoreslist.persuading : null}</td>
        </span>
      )
    })
  }

  render () {
    return (
      <div>
        <div>Player details</div>

        <table style={{ width: '100%' }}>
          <tr>
            <th colSpan='2' style={{ textAlign: 'center' }}>
              country name
            </th>
            <th colSpan='8' style={{ textAlign: 'center' }}>
              scores details
            </th>
          </tr>
          <tr>
            <th style={{ width: 30 }}>country data name</th>
            <th>isoCode</th>
            <th>communicating</th>
            <th>evaluating</th>
            <th>leading</th>
            <th>deciding</th>
            <th>trusting</th>
            <th>disagreeing</th>
            <th>scheduling</th>
            <th>persuading</th>
          </tr>
          {this.state.sampledata.map((monthdata, index) => {
            return (
              <tr>
                <th>{monthdata.name}</th>
                <th>{monthdata.isoCode}</th>
                <th>{monthdata.scores.communicating}</th>
                <th>{monthdata.scores.evaluating}</th>
                <th>{monthdata.scores.leading}</th>
                <th>{monthdata.scores.deciding}</th>
                <th>{monthdata.scores.trusting}</th>
                <th>{monthdata.scores.disagreeing}</th>
                <th>{monthdata.scores.scheduling}</th>
                <th>{monthdata.scores.persuading}</th>
              </tr>
            )
          })}
        </table>
      </div>
    )
  }
}
