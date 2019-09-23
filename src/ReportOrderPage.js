import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Button, Table } from 'antd';
import './CSS/reportOrderPage.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CustomerTable from './CustomerTable'
const db = firebase.firestore();
const { Column } = Table;
var userDataList = [];


// var tmparray = [
//   {
//     Name: "name",
//     Info: "info",
//     Phone: "213",
//     stateWork: "status"
//   },
//   {
//     Name: "name",
//     Info: "info",
//     Phone: "213",
//     stateWork: "status"
//   },
// ]

class ReportOrderPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }


  clkOrderState = () => {
    db.collection("CustomerDBtest").where("stateWork", "==", "order")
    .onSnapshot((querySnapshot) =>{
        const userDataList = [];
        querySnapshot.forEach((doc) => {
            const userData = {
              Name: doc.data().Name,
              Info: doc.data().Info,
              Phone: doc.data().Phone,
              stateWork: doc.data().stateWork
            }
            userDataList.push(userData);
        });
        // console.log(doc.data());
        console.log('userDataLlist ',userDataList) 
        this.setState({data : userDataList})
        console.log(this.state.data);
    });    
  }

  clkDoingState = () => {
    db.collection("CustomerDBtest").where("stateWork", "==", "doing")
    .onSnapshot((querySnapshot) =>{
        const userDataList = [];
        querySnapshot.forEach((doc) => {
            const userData = {
              Name: doc.data().Name,
              Info: doc.data().Info,
              Phone: doc.data().Phone,
              stateWork: doc.data().stateWork
            }
            userDataList.push(userData);
        });
        // console.log(doc.data());
        console.log('userDataLlist ',userDataList) 
        this.setState({data : userDataList})
        console.log(this.state.data);
    });    
  }

  clkDoneState = () => {
    db.collection("CustomerDBtest").where("stateWork", "==", "done")
    .onSnapshot((querySnapshot) =>{
        const userDataList = [];
        querySnapshot.forEach((doc) => {
            const userData = {
              Name: doc.data().Name,
              Info: doc.data().Info,
              Phone: doc.data().Phone,
              stateWork: doc.data().stateWork
            }
            userDataList.push(userData);
        });
        // console.log(doc.data());
        console.log('userDataLlist ',userDataList) 
        this.setState({data : userDataList})
        console.log(this.state.data);
    });    
  }


  // clkOrderState = () => {
  //   db.collection("CustomerDB").where("stateWork", "==", "done")
  //     .onSnapshot(function (querySnapshot) {
  //           const userDataList = [];
  //       querySnapshot.forEach(function (doc) {
  //         let li = document.createElement('li');
  //         let user = document.createElement('span')
  //         user.textContent = doc.data().name;
  //         li.appendChild(user);
  //       });
  //     });
  // }

  // readerData = (doc) => {
  //   let li = document.createElement('li');
  //   let user = document.createElement('span')
  //   user.textContent = doc.data().name;
  //   li.appendChild(user);
  // }

  render() {
    return (
      <div >
        <Table dataSource={this.state.data}>
          <Column title="Name" dataIndex="Name" />
          <Column title="Info" dataIndex="Info" />
          <Column title="Phone" dataIndex="Phone" />
          <Column title="Status" dataIndex="stateWork" />
        </Table>


        <div >
          <Button onClick={this.clkOrderState}>Order</Button>
          <Button onClick={this.clkDoingState}>Doing</Button>
          <Button onClick={this.clkDoneState}>Done</Button>
        </div>


      </div>
    );
  }
}
export default ReportOrderPage;