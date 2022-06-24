import React, {useEffect, useState} from "react";
import '../css/register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareParking } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

const EditVehicle = () => {
  const navigate = useNavigate();

  const VURL = "https://angry-guests-call-102-113-230-160.loca.lt/api/vehicle";

  useEffect(() => {
    authenticateCheck();
  }, []);

  const authenticateCheck = () => {
    const token = localStorage.getItem("access-token");
    if(token == null) {
      navigate("/login");
    }
  }  

  const [plateno, setPlateno] = useState('');
  const [oname, setOname] = useState('');
  const [vtype, setVtype] = useState('');
  const [email, setEmail] = useState('');
  const [timein, setTimein] = useState('');
  const [timeout, setTimeout] = useState('');
  const [phone, setPhone] = useState('');
  const [colour, setColour] = useState('');
  const [brand, setBrand] = useState('');

  const registerVehicle = (event) => {
    event.preventDefault();
    const vehicle = { 
      "plate_no": plateno,
      "owner": oname,
      "email": email,
      "nic": brand,
      "type": vtype,
      "phone": phone,
      "colour": colour,
      "time_in": timein,
      "time_out": timeout
      };
      axios.post(VURL, vehicle)
          .then(response => (response.status))
          .catch(error => {
              this.setState({ errorMessage: error.message });
              console.error('There was an error!', error);
          });
          navigate("/home");
  };

    return <div className="register">
    <a href="https://front.codes/" className="logo" target="_blank">
   </a>

     <input className="menu-icon" type="checkbox" id="menu-icon" name="menu-icon"/>
     <label htmlFor="menu-icon"></label>
     <nav className="nav"> 		
         <ul className="pt-5">
             <li><Link to="/home">Home</Link></li>
             <li><Link to="/add-user">Add User</Link></li>
             <li><Link to="/edit-profile">My Profile</Link></li>
             <li><Link to="/login">Logout</Link></li>
         </ul>
     </nav>

     <div className="section-center">
     </div>
   <h1>Add vehicle</h1>
   <hr />
   <div className="form-style-5">
       <form onSubmit={registerVehicle}>
       <fieldset>
       <legend><span className="number">1</span> Vehicle Info</legend>
       <input type="text" value={plateno} onChange={e => setPlateno(e.target.value)} name="field1" placeholder="Plate No *" />
       <input type="text" value={oname} onChange={e => setOname(e.target.value)} name="field2" placeholder="Owner Name *" />
       <input type="email" value={email} onChange={e => setEmail(e.target.value)} name="field3" placeholder="Owner Email *" />
       <label htmlFor="job">Vehicle Type:</label>
       <select value={vtype} onChange={e => setVtype(e.target.value)} id="job" name="field4">
       <optgroup label="V type">
         <option value="SUV">SUV</option>
         <option value="4 x 4">4 x 4</option>
         <option value="2 x 4">2 x 4</option>
         <option value="Lorry">Lorry</option>
         <option value="Car">Car</option>
         <option value="Van">Van</option>
         <option value="Bus">Bus</option>
         <option value="Motorcycle">Motorcycle</option>
         <option value="Others">Others</option>
       </optgroup>
       </select> 
       <label htmlFor="ti">Time In:</label>
       <input type="time" value={timein} onChange={e => setTimein(e.target.value)} name="field9" placeholder="Time In" />
       <label htmlFor="to">Time Out:</label>
       <input type="time" value={timeout} onChange={e => setTimeout(e.target.value)} name="field10" placeholder="Time Out" />     
       </fieldset>
       <fieldset>
       <legend><span className="number">2</span> Additional Info</legend>
       <input type="text" value={brand} onChange={e => setBrand(e.target.value)} name="field5" placeholder="Car Brand" />
       <input type="number" value={phone} onChange={e => setPhone(e.target.value)} name="field6" placeholder="Phone No *" />
       <input type="text" value={colour} onChange={e => setColour(e.target.value)} name="field7" placeholder="Colour" />
       </fieldset>
       <input type="submit" value="Apply" />
       </form>
       </div>
       
</div>
}

export default EditVehicle;