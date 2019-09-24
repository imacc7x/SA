import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
import { Table } from 'antd';
import { functions } from 'firebase';

const { Column } = Table;

class CustomerTable extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
        };
    }

    // componentWillReceiveProps(nextProps){
    //     this.setState({
    //         data: nextProps.data
    //     })

    //     console.log("props: ",nextProps.data);
    //     console.log("stateTable: ", this.state.data);
        
    // }

    render() {
        return (
            <div>
                <Table dataSource={this.state.data}>
                    <Column title="Name" dataIndex="Name"  />
                    <Column title="Info" dataIndex="Info" />
                    <Column title="Phone" dataIndex="Phone" />
                    <Column title="Status" dataIndex="stateWork" />
                </Table>
            </div>
        );
    }
}
export default CustomerTable;