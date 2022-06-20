import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Popconfirm } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import '../css/home.css';
import 'antd/dist/antd.css';
import Highlighter from 'react-highlight-words'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareParking } from '@fortawesome/free-solid-svg-icons'
import { Excel } from "antd-table-saveas-excel";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
//const saved = localStorage.getItem(key);


const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [vehicles, setVehicles] = useState([]);

  // const data = [
  //   {
  //     key: '1',
  //     name: 'John Brown',
  //     age: 32,
  //     address: 'New York No. 1 Lake Park',
  //   },
  //   {
  //     key: '2',
  //     name: 'Joe Black',
  //     age: 42,
  //     address: 'London No. 1 Lake Park',
  //   },
  //   {
  //     key: '3',
  //     name: 'Jim Green',
  //     age: 32,
  //     address: 'Sidney No. 1 Lake Park',
  //   },
  //   {
  //     key: '4',
  //     name: 'Jim Red',
  //     age: 32,
  //     address: 'London No. 2 Lake Park',
  //   },
  // ];

  useEffect(() => {
    getUsers();
    getVehicle();
  }, []);

  const userData = [];
  const vehicleData = [];
  
  const getUsers = () => {
      axios.get('https://shaky-wolves-clap-102-112-2-52.loca.lt/api/user')
        .then(response => setUsers(response.data))
        .catch(error => {
            console.error('There was an error!', error);
        });
  }

  const getVehicle = () => {
    axios.get('https://shaky-wolves-clap-102-112-2-52.loca.lt/api/vehicle')
      .then(response => setVehicles(response.data))
      .catch(error => {
          console.error('There was an error!', error);
      });
}

  for(let i = 0; i < users.length; i++) {
    userData.push({
      key: users[i].id,
      name: users[i].username,
      mail: users[i].email,
      phone: users[i].phone,
      nic: users[i].nic,
    });
  }

  for(let i = 0; i < vehicles.length; i++) {
    vehicleData.push({
      key: vehicles[i].id,
      plate_no: vehicles[i].plate_no,
      brand: vehicles[i].nic,
      phone: vehicles[i].phone,
      owner: vehicles[i].owner,
      timein: vehicles[i].time_in,
      timeout: vehicles[i].time_out,
    });
  }

  const handleClick = () => {
    const excel = new Excel();
    excel
      .addSheet("Parking - User Data")
      .addColumns(columns)
      .addDataSource(userData, {
        str2Percent: true
      })
      .saveAs("UserData.xlsx");
  };

  const handleDelete = (key) => {
    console.log("KEY", key);
    window.location.reload();
    axios.delete("https://shaky-wolves-clap-102-112-2-52.loca.lt/api/user/" + key)
      .then(response => {
        console.log(response);
        this.getUsers();
      })
      .catch(err => {
        console.log(err);
      });
  };

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
  
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
      };
    
      const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
      };
    
      const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
          <div
            style={{
              padding: 8,
            }}
          >
            <Input
              ref={searchInput}
              placeholder={`Search ${dataIndex}`}
              value={selectedKeys[0]}
              onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
              onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
              style={{
                marginBottom: 8,
                display: 'block',
              }}
            />
            <Space>
              <Button
                type="primary"
                onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                icon={<SearchOutlined />}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Search
              </Button>
              <Button
                onClick={() => clearFilters && handleReset(clearFilters)}
                size="small"
                style={{
                  width: 90,
                }}
              >
                Reset
              </Button>
              <Button
                type="link"
                size="small"
                onClick={() => {
                  confirm({
                    closeDropdown: false,
                  });
                  setSearchText(selectedKeys[0]);
                  setSearchedColumn(dataIndex);
                }}
              >
                Filter
              </Button>
            </Space>
          </div>
        ),
        filterIcon: (filtered) => (
          <SearchOutlined
            style={{
              color: filtered ? '#1890ff' : undefined,
            }}
          />
        ),
        onFilter: (value, record) =>
          record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
      
        render: (text) =>
          searchedColumn === dataIndex ? (
            <Highlighter
              highlightStyle={{
                backgroundColor: '#ffc069',
                padding: 0,
              }}
              searchWords={[searchText]}
              autoEscape
              textToHighlight={text ? text.toString() : ''}
            />
          ) : (
            text
          ),
      });
    
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          width: '30%',
          ...getColumnSearchProps('name'),
          sorter: (a, b) => a.name.length - b.name.length,
          sortDirections: ['descend', 'ascend']
        },
        {
          title: 'Email',
          dataIndex: 'mail',
          key: 'mail',
          width: '20%',
          ...getColumnSearchProps('mail'),
          sorter: (a, b) => a.mail.length - b.mail.length,
          sortDirections: ['descend', 'ascend']
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone',
          ...getColumnSearchProps('phone'),
        },
        {
          title: 'NIC No',
          dataIndex: 'nic',
          key: 'nic',
          ...getColumnSearchProps('nic'),
        },
        {
          title: 'operation',
          dataIndex: 'operation',
          render: (_, record) =>
            userData.length >= 1 ? (
              <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.name)}>
                <a>Delete</a>
              </Popconfirm>
            ) : null,
        },
      ];

      const columns1 = [
        {
          title: 'Reg_No',
          dataIndex: 'plate_no',
          key: 'plate_no',
          width: '30%',
          ...getColumnSearchProps('plate_no'),
          sorter: (a, b) => a.plate_no.length - b.plate_no.length,
          sortDirections: ['descend', 'ascend']
        },
        {
          title: 'Make',
          dataIndex: 'brand',
          key: 'brand',
          width: '20%',
          ...getColumnSearchProps('brand'),
          sorter: (a, b) => a.brand.length - b.brand.length,
          sortDirections: ['descend', 'ascend']
        },
        {
          title: 'Owner',
          dataIndex: 'owner',
          key: 'owner',
          width: '20%',
          ...getColumnSearchProps('owner'),
          sorter: (a, b) => a.owner.length - b.owner.length,
          sortDirections: ['descend', 'ascend']
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone',
          ...getColumnSearchProps('phone'),
        },
        {
          title: 'Time In',
          dataIndex: 'timein',
          key: 'timein',
          ...getColumnSearchProps('timein'),
        },
        {
          title: 'Time Out',
          dataIndex: 'timeout',
          key: 'timeout',
          ...getColumnSearchProps('timeout'),
        }
      ];

    return <div className="home-page">
       <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#"><FontAwesomeIcon icon={faSquareParking} /></a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarText">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                    <a className="nav-link" href="#">Add Vehicle</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">Add User</a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#">View Profile</a>
                    </li>
                </ul>
                <span className="navbar-text">
                <a className="nav-link" href="#">Logout</a>
                </span>
                </div>
            </div>
        </nav>
        <br />
        <div className="container" style={{textAlign: "center"}} >
            <div className="row">
                <div className="col-lg-6">
                <div className="alert alert-primary" role="alert">
                    No of Users: {users.length}
                </div>
                </div>
                <div className="col-lg-6">
                <div className="alert alert-danger" role="alert">
                    No of vehicles: {vehicles.length}
                </div>
                </div>
            </div>
        </div>
        <div className="container" style={{textAlign: "center"}} >
            <div className="row">
                <div className="col-lg-12">
                <div className="alert alert-success" role="alert">
                    Welcome Varun Puttur!
                </div>
                </div>
            </div>
        </div>
        <hr />
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                <h2>
                    Lists of users
                </h2>
                <hr />
                <button onClick={handleClick}>Export</button>
                <Table columns={columns} dataSource={userData} />
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                <h2>
                    Lists of Vehicles
                </h2>
                <hr />
                <Table columns={columns1} dataSource={vehicleData} />
                </div>
            </div>
        </div>
    </div>

}

export default Dashboard;