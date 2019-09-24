import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Table, Input, InputNumber, Popconfirm, Form, Button,Select } from 'antd';
import './CSS/reportOrderPage.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import CustomerTable from './CustomerTable'
const db = firebase.firestore();
const { Column } = Table;
let i = 0;
const { Option } = Select;


function handleChange(value) {
  console.log(`selected ${value}`);
}

class ReportOrderPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [],
    }
  }

 

  componentDidMount() {
    db.collection("CustomerDBtest").onSnapshot(querySnapshot => {
      let userDataList = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
        userDataList.push({
          key: i,
          Name: doc.data().Name,
          Info: doc.data().Info,
          Phone: doc.data().Phone,
          stateWork: doc.data().stateWork
        })
        
        i++;
      });
      console.log(userDataList);
      this.setState({ data: userDataList });
    })
  }

  // getStateWork = () => {
  //   db.collection("CustomerDBtest").where("stateWork", "==", "order")
  //     .onSnapshot((querySnapshot) => {
  //       const stateWorkList = [];
  //       querySnapshot.forEach((doc) => {
  //         const tmp = {
  //           stateWork: doc.data().stateWork
  //         }
  //         stateWorkList.push(tmp);
  //       });
  //       console.log('stateWorklist ', stateWorkList)
  //       this.setState({ data: stateWorkList})
  //       console.log(this.state.data);
  //     });
  // }
  

  clkOrderState = () => {
    db.collection("CustomerDBtest").where("stateWork", "==", "order")
      .onSnapshot((querySnapshot) => {
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
        console.log('userDataLlist ', userDataList)
        this.setState({ data: userDataList })
        console.log(this.state.data);
      });
  }

  clkDoingState = () => {
    db.collection("CustomerDBtest").where("stateWork", "==", "doing")
      .onSnapshot((querySnapshot) => {
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
        console.log('userDataLlist ', userDataList)
        this.setState({ data: userDataList })
        console.log(this.state.data);
      });
  }

  clkDoneState = () => {
    db.collection("CustomerDBtest").where("stateWork", "==", "done")
      .onSnapshot((querySnapshot) => {
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
        console.log('userDatalist ', userDataList)
        this.setState({ data: userDataList })
        console.log(this.state.data);
      });
  }


  render() {

    const Column = [
      {
        title: "Name",
        dataIndex: "Name"
      },
      {
        title: "Info",
        dataIndex: "Info"
      },
      {
        title: "Phone",
        dataIndex: "Phone"
      },
      {
        title: "Price",
        dataIndex: "Price"
      },
      {
        title: "Worklink",
        dataIndex: "WorkLink"
      },
      {
        title: "Status",
        dataIndex: "stateWork",
        render: () => (
          <Select defaultValue= "lucy" style={{ width: 120 }} onChange={handleChange}>
            <Option value="Order">Order</Option>
            <Option value="Doing">Doing</Option>
            <Option value="Done">Done</Option>
          </Select>
        )
      }
    ]
    return (
      <div >
        <Table columns={Column} dataSource={this.state.data} />
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