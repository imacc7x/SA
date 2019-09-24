import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Table, Input, InputNumber, Popconfirm, Form ,Button} from 'antd';
import './CSS/reportOrderPage.css'
const db = firebase.firestore();
const { Column } = Table;
let i = 0;



// const data = [];
// db.collection("CustomterDBtest").onSnapshot(querySnapshot =>{
//   querySnapshot.forEach((doc) =>{
//     data.push({
//       key: i,
//       Name: doc.data().Name,
//       Info: doc.data().Info,
//       Phone: doc.data().Phone,
//       stateWork: doc.data().stateWork
//     })
//     i++;
    
//   });
// })
const EditableContext = React.createContext();

class EditableCell extends React.Component {
  getInput = () => {
    if (this.props.inputType === 'number') {
      return <InputNumber />;
    }
    return <Input />;
  };

  renderCell = ({ getFieldDecorator }) => {
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      children,
      ...restProps
    } = this.props;
    return (
      <td {...restProps}>
        {editing ? (
          <Form.Item style={{ margin: 0 }}>
            {getFieldDecorator(dataIndex, {
              rules: [
                {
                  required: true,
                  message: `Please Input ${title}!`,
                },
              ],
              initialValue: record[dataIndex],
            })(this.getInput())}
          </Form.Item>
        ) : (
          children
        )}
      </td>
    );
  };

  render() {
    return <EditableContext.Consumer>{this.renderCell}</EditableContext.Consumer>;
  }
}

class ReportOrderPage extends React.Component{
  constructor(props) {
    super(props);
    this.state = { data: [], editingKey: '' };
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'Name',
        width: '25%',
        editable: true,
      },
      {
        title: 'Info',
        dataIndex: 'Info',
        width: '30%',
        editable: true,
      },
      {
        title: 'Phone',
        dataIndex: 'Phone',
        width: '20%',
        editable: true,
      },
      {
        title: 'Status',
        dataIndex: 'stateWork',
        width: '10%',
        editable: true,
      },
      {
        title: 'Price',
        dataIndex: 'Price',
        width: '40%',
        editable: true,
      },
      {
        title: 'operation',
        dataIndex: 'operation',
        render: (text, record) => {
          const { editingKey } = this.state;
          const editable = this.isEditing(record);
          return editable ? (
            <span>
              <EditableContext.Consumer>
                {form => (
                  <a
                    onClick={() => this.save(form, record.key)}
                    style={{ marginRight: 8 }}
                  >
                    Save
                  </a>
                )}
              </EditableContext.Consumer>
              <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>
              Edit
            </a>
          );
        },
      },
    ];
  }

  componentDidMount(){
    db.collection("CustomerDBtest").onSnapshot(querySnapshot =>{
      let userDataList = [];
      querySnapshot.forEach((doc) =>{
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
      // console.log(db.data().id);
      
      this.setState({data: userDataList});
    })
  }

  isEditing = record => record.key === this.state.editingKey;

  cancel = () => {
    this.setState({ editingKey: '' });
  };

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        console.log("newData: ", newData[index]);
        db.collection('CustomerDBtest').doc().update({
          
        })
        // add data to firebase
        // var firebaseref = firebase.database().ref('CustomerDBtest/LmL1BY9PYcZd1gLQfFdN')
        // firebaseref.update({Name: 'Momo'});
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(row);
        this.setState({ data: newData, editingKey: '' });
      }
    });
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

  clkAllState = () => {
    db.collection("CustomerDBtest")
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

  edit(key) {
    this.setState({ editingKey: key });
  }

  render() {
    const components = {
      body: {
        cell: EditableCell,
      },
    };

    const columns = this.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'age' ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <EditableContext.Provider value={this.props.form}>
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
        />
          <Button onClick={this.clkOrderState}>Order</Button>
          <Button onClick={this.clkDoingState}>Doing</Button>
          <Button onClick={this.clkDoneState}>Done</Button>
          <Button onClick={this.clkAllState}>All</Button>
      </EditableContext.Provider>
       
    );
  }
}


export default Form.create()(ReportOrderPage);
