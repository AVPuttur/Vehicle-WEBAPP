import React, {useEffect, useState} from "react";
import { useNavigate, Link } from "react-router-dom";
import '../css/register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareParking } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

const AddUser = () => {

  const navigate = useNavigate();

  const UURL = "https://angry-guests-call-102-113-230-160.loca.lt/api/user";

  useEffect(() => {
    authenticateCheck();
  }, []);

  const [uname, setUname] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [nic, setNic] = useState('');

  const authenticateCheck = () => {
    const token = localStorage.getItem("access-token");
    if(token == null) {
      navigate("/login");
    }
  }  

  const registerUser = (event) => {
    event.preventDefault();
    const user = { 
    "username": uname,
    "password": password,
    "email": email,
    "role": "Normal User",
    "phone": phone,
    "nic": nic,
    "image": profile,
    "code": fname+"-"+lname
    };
    axios.post(UURL, user)
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
  			<li><Link to="/home">Home</Link></li>
  			<li><Link to="/add-vehicle">Add Vehicle</Link></li>
  			<li><Link to="/edit-profile">My Profile</Link></li>
        <li><Link to="/login">Logout</Link></li>
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