import React, {useEffect} from "react";
import '../css/register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareParking } from '@fortawesome/free-solid-svg-icons'

const EditProfile = () => {

    return <div className="register">
     <a href="https://front.codes/" className="logo" target="_blank">
	</a>

  	<input className="menu-icon" type="checkbox" id="menu-icon" name="menu-icon"/>
  	<label htmlFor="menu-icon"></label>
  	<nav className="nav"> 		
  		<ul className="pt-5">
  			<li><a href="#">Home</a></li>
  			<li><a href="#">Add Vehicle</a></li>
  			<li><a href="#">Add User</a></li>
        <li><a href="#">Logout</a></li>
  		</ul>
  	</nav>

  	<div className="section-center">
  	</div>
    <h1>Edit Profile</h1>
    <hr />
    <div className="form-style-5">
        <form>
        <fieldset>
        <legend><span className="number">1</span> Candidate Info</legend>
        <input type="text" name="field1" placeholder="Username *" />
        <input type="text" name="field2" placeholder="First Name *" />
        <input type="text" name="field3" placeholder="Lastname *" />
        <input type="email" name="field4" placeholder="Your Email *" />
        <label htmlFor="job">Upload Image:</label>
        <input type="file" name="field9" placeholder="Profile Picture" />
        </fieldset><br />
        <fieldset>
        <legend><span className="number">2</span> Additional Info</legend>
        <select id="job" name="field8">
        <optgroup label="Gender">
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </optgroup>
        </select>      
        <input type="number" name="field6" placeholder="Phone No *" />
        <input type="text" name="field7" placeholder="NIC No *" />
        </fieldset>
        <input type="submit" value="Apply" />
        </form>
        
        </div>
        
</div>

}

export default EditProfile;