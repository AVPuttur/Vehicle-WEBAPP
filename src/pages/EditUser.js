import React, {useEffect, useState} from "react";
import '../css/register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareParking } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";


const EditUser = () => {
    const navigate = useNavigate();

    const UURL = "http://localhost:6900/api/user/";

    const [users, setUsers] = useState([]);
    const [uname, setUname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [nic, setNic] = useState('');

    useEffect(() => {
       // getUsers();
       test();
       test1();
      }, []);

      const authenticateCheck = () => {
        const token = localStorage.getItem("access-token");
        if(token == null) {
          navigate("/login");
        }
      }  

      const getUsers = () => {
        let username = localStorage.getItem("uname");
        //console.log(username);
        axios.get(UURL+username)
          .then(response => {
            if(response.status == 200) {
                setUsers(response.data);
                console.log(response.data)
            
                if (users.length > 0) {
                  for(let i = 0; i < users.length; i++) {
                    console.log("FDF")
                      console.log("UN", users[i].username);
                      setUname(users[i].username);
                      setPassword(users[i].password);
                      setEmail(users[i].email);
                      setPhone(users[i].phone);
                      setNic(users[i].nic);
                    }
              }
            }
          })
          .catch(error => {
              console.error('There was an error!', error);
          });
    }

  //this.setUname("VPALD");
  const test = () => {
    console.log("TREST");
    //setUname("BH");
    axios.get(UURL+"jeereshl")
          .then(response => {
            if(response.status == 200) {
                setUsers(response.data);
                console.log(response.data)
            }
          })
          .catch(error => {
              console.error('There was an error!', error);
          });
  }

  const test1 = () => {
    console.log("TRESTa");
    console.log(users.length);
    if (users.length > 0) {
      for(let i = 0; i < users.length; i++) {
          // console.log("VG", users[i].username);
          // setUname(users[i].username);
          // setPassword(users[i].password);
          // setEmail(users[i].email);
          // setPhone(users[i].phone);
          // setNic(users[i].nic);
        }
        //setUname("DDDD");
  }
    
  }

    const updateUser = (event) => {
        event.preventDefault();
        const user = { 
        "username": uname,
        "password": password,
        "email": email,
        "phone": phone,
        "nic": nic,
        "code": ""
        };
        axios.put(UURL+user.username, user)
            .then(response => (response.status))
            .catch(error => {
                //this.setState({ errorMessage: error.message });
                console.error('There was an error!', error);
            });
            navigate("/home");
            //console.log(uname)
      };


    

    // console.log(users.length);

    return <div className="register">
     <a href="https://front.codes/" className="logo" target="_blank">
	</a>

  	<input className="menu-icon" type="checkbox" id="menu-icon" name="menu-icon"/>
  	<label htmlFor="menu-icon"></label>
  	<nav className="nav"> 		
  		<ul className="pt-5">
  			<li><Link to="/home">Home</Link></li>
        <li><Link to="/login">Logout</Link></li>
  		</ul>
  	</nav>

  	<div className="section-center">
  	</div>
    <h1>Edit User</h1>
    <hr />
    <div className="form-style-5">
        <form onSubmit={updateUser} >
        <fieldset>
        <legend><span className="number">1</span> Candidate Info</legend>
        <input type="text" value={uname} onChange={e => setUname(e.target.value)} name="field1" placeholder="Username *" />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} name="field4" placeholder="Your Email *" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="field11" placeholder="Password *" />
        </fieldset><br />
        <fieldset>
        <legend><span className="number">2</span> Additional Info</legend>     
        <input type="number" value={phone} onChange={e => setPhone(e.target.value)}name="field6" placeholder="Phone No *" />
        <input type="text" value={nic} onChange={e => setNic(e.target.value)} name="field7" placeholder="NIC No *" />
        </fieldset>
        <input type="submit" value="Apply" />
        </form>
        
        </div>
        
</div>

}

export default EditUser;