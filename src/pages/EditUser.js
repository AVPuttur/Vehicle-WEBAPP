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
       getUsers();
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
       // let uname = "";
        axios.get(UURL+username)
          .then(response => {
            if(response.status == 200) {
                setUsers(response.data);
                console.log(response.data);
            }
            
          })
          .catch(error => {
              console.error('There was an error!', error);
          });
    }

    const updateUser = (event) => {
      let username = localStorage.getItem("uname");
      let uname1 ="", pass1 ="", email1="", phone1="", nic1="";
      console.log(password);
      if(uname == "") {
        uname1 = users[0].username;
      }else {
        uname1 = uname
      }
      if(password == "") {
        pass1 = users[0].password;
      }else {
        pass1 = password;
      }
      if(email == "") {
        email1 = users[0].email;
      }else {
        email1 = email;
      }
      if(phone == ""){
        phone1 = users[0].phone;
      }else {
        phone1 = phone;
      }
      if(nic == ""){
        nic1 = users[0].nic;
      }else {
        nic1 = nic;
      }
        //console.log(users[0].password)
        event.preventDefault();
        const user = { 
        "username": uname1,
        "password": pass1,
        "email": email1,
        "phone": phone1,
        "nic": nic1,
        "code": ""
        };
        console.log(user);
        axios.put(UURL+username, user)
            .then(response => (response.status))
            .catch(error => {
                //this.setState({ errorMessage: error.message });
                console.error('There was an error!', error);
            });
            navigate("/home");
            //console.log(uname)
      };


    

    // console.log(users.length);
    if(users.length > 0) {
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
    {users.map((post) => {
return (
    <div className="form-style-5" key={post.id}>
          
        <form onSubmit={updateUser} >
        <fieldset>
        <legend><span className="number">1</span> Candidate Info</legend>
        <input readOnly type="text" defaultValue={post.username} onChange={e => setUname(e.target.value)} name="field1" placeholder="Username *" />
        <input type="email" defaultValue={post.email} onChange={e => setEmail(e.target.value)} name="field4" placeholder="Your Email *" />
        <input type="password" defaultValue={post.password} onChange={e => setPassword(e.target.value)} name="field11" placeholder="Password *" />
        </fieldset><br />
        <fieldset>
        <legend><span className="number">2</span> Additional Info</legend>     
        <input type="number" defaultValue={post.phone} onChange={e => setPhone(e.target.value)} name="field6" placeholder="Phone No *" />
        <input type="text" defaultValue={post.nic} onChange={e => setNic(e.target.value)} name="field7" placeholder="NIC No *" />
        </fieldset>
        <input type="submit" value="Apply" />
        </form>
        
        </div>
             )
            })}
        
</div> 
    }

}

export default EditUser;