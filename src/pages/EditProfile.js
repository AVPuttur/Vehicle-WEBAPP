import React, {useEffect, useState} from "react";
import '../css/register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareParking } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";


const EditProfile = () => {
  const [users, setUsers] = useState([]);
  const [uname, setUname] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [profile, setProfile] = useState('');
  const [gender, setGender] = useState('');
  const [phone, setPhone] = useState('');
  const [nic, setNic] = useState('');


  const navigate = useNavigate();

  const UURL = "http://localhost:6900/api/user/";

  useEffect(() => {
    authenticateCheck();
  }, []);

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
    let uname1 ="", pass1 ="", email1="", phone1="", nic1="", image1="";
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
    if(profile == ""){
      image1 = users[0].image;
    }else {
      image1 = profile;
    }
      //console.log(users[0].password)
      event.preventDefault();
      const user = { 
        "username": uname,
        "password": password,
        "email": email,
        "role": "Admin",
        "phone": phone,
        "nic": nic,
        "image": profile,
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

    return <div className="register">
     <a href="https://front.codes/" className="logo" target="_blank">
	</a>

  	<input className="menu-icon" type="checkbox" id="menu-icon" name="menu-icon"/>
  	<label htmlFor="menu-icon"></label>
  	<nav className="nav"> 		
  		<ul className="pt-5">
  			<li><Link to="/home">Home</Link></li>
  			<li><Link to="/add-vehicle">Add Vehicle</Link></li>
  			<li><Link to="/add-user">Add User</Link></li>
        <li><Link to="/login">Logout</Link></li>
  		</ul>
  	</nav>

  	<div className="section-center">
  	</div>
    <h1>Edit Profile</h1>
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
        <label htmlFor="job">Upload Image:</label>
        <input type="text" defaultValue={post.image} onChange={e => setProfile(e.target.value)} />
        </fieldset><br />
        <fieldset>
        <legend><span className="number">2</span> Additional Info</legend>
        <select defaultValue={post.gender} onChange={e => setGender(e.target.value)} id="job" name="field8">
        <optgroup label="Gender">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </optgroup>
        </select>      
        <input type="number" defaultValue={post.phone} onChange={e => setPhone(e.target.value)}name="field6" placeholder="Phone No *" />
        <input type="text" defaultValue={post.nic} onChange={e => setNic(e.target.value)} name="field7" placeholder="NIC No *" />
        </fieldset>
        <input type="submit" value="Apply" />
        </form>
        
        </div>
         )
        })}
        
</div>

}

export default EditProfile;