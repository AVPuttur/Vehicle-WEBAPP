import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Popconfirm } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import '../css/home.css';
import 'antd/dist/antd.css';
import Highlighter from 'react-highlight-words'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareParking } from '@fortawesome/free-solid-svg-icons'
import { Excel } from "antd-table-saveas-excel";
import { Modal } from "react-bootstrap";
import axios from 'axios';
import { useNavigate, Link } from "react-router-dom";

const Monitor = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [uname, setUname] = useState([]);
  const [show, setShow] = useState(false);
  const [plateno, setPlateno] = useState('');


  const VURL = "http://localhost:6900/api/vehicle";
  const UURL = "http://localhost:6900/api/user";

  useEffect(() => {
    authenticateCheck();
    getUsers();
    getVehicle();
  }, []);

  const userData = [];
  const vehicleData = [];

 

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  //let uName = "";
  
  const getUsers = () => {
      axios.get(UURL)
        .then(response => setUsers(response.data))
        .catch(error => {
            console.error('There was an error!', error);
        });
  }

  const getVehicle = () => {
    axios.get(VURL)
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
    if(vehicles[i].time_out == "") {
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
  }

  const handleClick = () => {
    const excel = new Excel();
    excel
      .addSheet("Parking - User Data")
      .addColumns(columnsUReport)
      .addDataSource(userData, {
        str2Percent: true
      })
      .saveAs("UserData.xlsx");
  };

  const handleClickVehicle = () => {
    const excel = new Excel();
    excel
      .addSheet("Parking - Vehicle Data")
      .addColumns(columnsVReport)
      .addDataSource(vehicleData, {
        str2Percent: true
      })
      .saveAs("VehicleData.xlsx");
  };

  const logout = () => {
    window.localStorage.clear();
    navigate('/login');
  }

  const handleDelete = (key) => {
    console.log("KEY", key);
    axios.delete(UURL + key)
      .then(response => {
        console.log(response);
        this.getUsers();
      })
      .catch(err => {
        console.log(err);
      });
      window.location.reload();
  };

  const handleDeleteVehicle = (key) => {
    console.log("KEY", key.plate_no);
    axios.delete(VURL +"/"+key.plate_no)
      .then(response => {
        console.log(response);
        this.getVehicle();
      })
      .catch(err => {
        console.log(err);
      });
      window.location.reload();
  };

  const authenticateCheck = () => {
    const token = localStorage.getItem("access-token");
    if(token == null) {
      navigate("/login");
    }else {
      setUname(localStorage.getItem("username"));
    }
    //return uName;
  }
  const handleUpdateUser = (e) => {
    console.log(e)
    localStorage.setItem("plate-no", e.plate_no);
    navigate("/edit-user");
    /*this.setU({
      currentId: e.id,
      editing: true,
      newUser: {
        name: e.name,
        //age: e.age
      }
    });*/
  };

  const handleUpdateVehicle = (e) => {
    console.log(e.plate_no);
    localStorage.setItem("plate_no", e.plate_no);
    navigate("/edit-vehicle");
    /*this.setU({
      currentId: e.id,
      editing: true,
      newUser: {
        name: e.name,
        //age: e.age
      }
    });*/
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
              <span>
              <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.name)}>
              <a>Delete</a>
              </Popconfirm> &nbsp;
              |&nbsp;&nbsp;
              <Popconfirm title="Sure to edit?" onConfirm={() => handleUpdateUser(record)}>
              <a>Edit</a>
              </Popconfirm>
              </span>
            ) : null,
        },
      ];

      const columnsUReport = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Email',
          dataIndex: 'mail',
          key: 'mail',
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone',
        },
        {
          title: 'NIC No',
          dataIndex: 'nic',
          key: 'nic',
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
        },
        {
          title: 'operation',
          dataIndex: 'operation',
          render: (_, record) =>
            vehicleData.length >= 1 ? (
              <span>
              <Popconfirm title="Sure to delete?" onConfirm={() => handleDeleteVehicle(record)}>
              <a>Delete</a>
              </Popconfirm> &nbsp;
              |&nbsp;&nbsp;
              <Popconfirm title="Sure to edit?" onConfirm={() => handleUpdateVehicle(record)}>
              <a>Edit</a>
              </Popconfirm>
              </span>
            ) : null,
        },
      ];

      const columnsVReport = [
        {
          title: 'Reg_No',
          dataIndex: 'plate_no',
          key: 'plate_no'
        },
        {
          title: 'Make',
          dataIndex: 'brand',
          key: 'brand'
        },
        {
          title: 'Owner',
          dataIndex: 'owner',
          key: 'owner'        
        },
        {
          title: 'Phone',
          dataIndex: 'phone',
          key: 'phone'
        },
        {
          title: 'Time In',
          dataIndex: 'timein',
          key: 'timein'
        },
        {
          title: 'Time Out',
          dataIndex: 'timeout',
          key: 'timeout'
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
                    <Link className="nav-link" to='/home'>Home</Link>
                    </li>
                </ul>
                <span className="navbar-text">
                <a className="nav-link" onClick={logout} href="#">Logout</a>
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
                    Welcome {uname}!
                </div>
                </div>
            </div>
        </div>
        <hr />
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                <h2>
                    Lists of all users
                </h2>
                <hr />
                <button className='export-button' onClick={handleClick}>Download User Report</button>
                <Table columns={columns} dataSource={userData} />
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                <h2>
                    Lists of Vehicles - In Parking
                </h2>
                <hr />
                <button className='export-button' onClick={handleClickVehicle}>Download Vehicle Report</button>
                <Table columns={columns1} dataSource={vehicleData} />
                </div>
            </div>
        </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body><label>Enter Vehicle No</label>&nbsp;&nbsp;<input type="text" value={plateno} onChange={e => setPlateno(e.target.value)} name="field1" placeholder="Plate No *" /></Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Search
          </Button>
        </Modal.Footer>
      </Modal>
    </div>

}

export default Monitor;