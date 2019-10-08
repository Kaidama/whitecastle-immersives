import React, { Component } from "react";
import { Pie } from "react-chartjs-2";
import Axios from "../utils/Axios";
import { handleJWTExpirationApi } from "../utils/api";

export default class PieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      labels1: [],

      datasets1: [
        {
          data: [],
          backgroundColor: []
        }
      ],

      labels2: [],
      datasets2: [
        {
          data: [],
          backgroundColor: []
        }
      ],

      labels3: [],
      datasets3: [
        {
          data: [],
          backgroundColor: []
        }
      ],
    };
  }

  componentDidMount() {
    handleJWTExpirationApi()
      .then(result => {
        Axios.get("/api/survey")
          .then(results => {
            console.log(results.data);
            let { educationCount, genderCount, employmentCount } = results.data;

            let dataArray1 = [
              {
                data: [genderCount[0].total, genderCount[1].total],
                backgroundColor: ["Pink", "Blue"]
              }
            ];
            let dataArray2 = [
              {
                data: [educationCount[0].total, educationCount[1].total,educationCount[2].total, educationCount[3].total,educationCount[4].total],
                backgroundColor: ["red", "Blue", "black", "yellow","green"]
              }
            ];
            let dataArray3 = [
                {
                  data: [employmentCount[0].total, employmentCount[1].total,employmentCount[2].total],
                  backgroundColor: ["green", "red", "yellow"]
                }
              ];

           


            this.setState({
                labels1: [genderCount[0]._id, genderCount[1]._id],
                 datasets1: dataArray1,
                
                 labels2: [educationCount[0]._id, educationCount[1]._id,educationCount[2]._id, educationCount[3]._id,educationCount[4]._id],
                 datasets2: dataArray2,

                labels3: [employmentCount[0]._id, employmentCount[1]._id,employmentCount[2]._id],
                 datasets3: dataArray3,
            });

          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h1> Gender</h1>

        <Pie
          data={{
            labels: this.state.labels1,
            datasets: this.state.datasets1
          }}
          height={90}
        />
        <br />
        <h1> Education</h1>
        <Pie
          data={{
            labels: this.state.labels2,
            datasets: this.state.datasets2
          }}
          height={125}
        />
        <br />
        <h1> Employment Status</h1>
        <Pie
          data={{
            labels: this.state.labels3,
            datasets: this.state.datasets3
          }}
          height={100}
        />
      </div>
    );
  }
}
