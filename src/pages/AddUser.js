import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import '../css/register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareParking } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const AddUser = () => {

  const navigate = useNavigate();

  const [uname, setUname] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [nic, setNic] = useState('');

  const registerUser = (event) => {
    event.preventDefault();
    const user = { 
    "username": uname,
    "password": password,
    "email": email,
    "role": "normal",
    "phone": phone,
    "nic": nic,
    "image": profile,
    "code": ""
    };
    axios.post('https://shaky-wolves-clap-102-112-2-52.loca.lt/api/user', user)
        .then(response => (response.status))
        .catch(error => {
            this.setState({ errorMessage: error.message });
            console.error('There was an error!', error);
        });
        navigate("/home");
        //console.log(uname)
  };

    return <div className="register">
     <a href="https://front.codes/" className="logo" target="_blank">
	</a>

  	<input className="menu-icon" type="checkbox" id="menu-icon" name="menu-icon"/>
  	<label htmlFor="menu-icon"></label>
  	<nav className="nav"> 		
  		<ul className="pt-5">
  			<li><a href="#">Home</a></li>
  			<li><a href="#">Add Vehicle</a></li>
  			<li><a href="#">My Profile</a></li>
        <li><a href="#">Logout</a></li>
  		</ul>
  	</nav>

  	<div className="section-center">
  	</div>
    <h1>Add User</h1>
    <hr />
    <div className="form-style-5">
        <form onSubmit={registerUser} >
        <fieldset>
        <legend><span className="number">1</span> Candidate Info</legend>
        <input type="text" value={uname} onChange={e => setUname(e.target.value)} name="field1" placeholder="Username *" />
        <input type="text" value={fname} onChange={e => setFname(e.target.value)} name="field2" placeholder="First Name *" />
        <input type="text" value={lname} onChange={e => setLname(e.target.value)} name="field3" placeholder="Lastname *" />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} name="field4" placeholder="Your Email *" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} name="field11" placeholder="Password *" />
        <label htmlFor="job">Upload Image:</label>
        <input type="text" value={profile} onChange={e => setProfile(e.target.value)} />
        </fieldset><br />
        <fieldset>
        <legend><span className="number">2</span> Additional Info</legend>
        <select value={gender} onChange={e => setGender(e.target.value)} id="job" name="field8">
        <optgroup label="Gender">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </optgroup>
        </select>      
        <input type="number" value={phone} onChange={e => setPhone(e.target.value)}name="field6" placeholder="Phone No *" />
        <input type="text" value={nic} onChange={e => setNic(e.target.value)} name="field7" placeholder="NIC No *" />
        </fieldset>
        <input type="submit" value="Apply" />
        </form>
        
        </div>
        
</div>

}

export default AddUser;