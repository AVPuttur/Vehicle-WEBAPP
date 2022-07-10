import React, {useEffect, useState} from "react";
import '../css/register.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSquareParking } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, Link } from "react-router-dom";
import axios from 'axios';

const EditVehicle = () => {
  const navigate = useNavigate();

  const VURL = "http://localhost:6900/api/vehicle/";

  const [vehicles, setVehicles] = useState([]);


  useEffect(() => {
    authenticateCheck();
    getVehicles();
  }, []);

  const authenticateCheck = () => {
    const token = localStorage.getItem("access-token");
    if(token == null) {
      navigate("/login");
    }
  }
  
  const getVehicles = () => {
    let plateno = localStorage.getItem("plate_no");
    console.log(plateno);
   // let uname = "";
    axios.get(VURL+plateno)
      .then(response => {
        if(response.status == 200) {
          setVehicles(response.data);
            console.log(response.data);
        }
        
      })
      .catch(error => {
          console.error('There was an error!', error);
      });
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

  const updateVehicle = (event) => {
    let plateno = localStorage.getItem("plate_no");
    let oname1 = "", vtype1 ="", email1 ="", timein1 ="", timeout1 ="", phone1 ="", colour1="", brand1 ="";
    if(oname == "") {
      oname1 = vehicles[0].owner;
    }else {
      oname1 = oname
    }
    if(vtype == ""){
      vtype1 = vehicles[0].type;
    }else{
      vtype1 = vtype;
    }
    if(email == ""){
      email1 = vehicles[0].email;
    }else{
      email1 = email;
    }
    if(timein == ""){
      timein1 = vehicles[0].time_in;
    }else{
      timein1 = timein;
    }
    if(timeout == ""){
      timeout1 = vehicles[0].time_out;
    }else{
      timeout1 = timeout;
    }
    if(phone == ""){
      phone1 = vehicles[0].phone;
    }else{
      phone1 = phone;
    }
    if(colour == ""){
      colour1 = vehicles[0].colour;
    }else{
      colour1 = colour;
    }
    if(brand == ""){
      brand1 = vehicles[0].nic;
    }else{
      brand1 = brand;
    }
    event.preventDefault();
    const vehicle = { 
      "plate_no": plateno,
      "owner": oname1,
      "email": email1,
      "nic": brand1,
      "type": vtype1,
      "phone": phone1,
      "colour": colour1,
      "time_in": timein1,
      "time_out": timeout1
      };
      axios.put(VURL+plateno, vehicle)
          .then(response => (response.status))
          .catch(error => {
              this.setState({ errorMessage: error.message });
              console.error('There was an error!', error);
          });
          localStorage.removeItem('plate_no');
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
   {vehicles.map((post) => {
return (
   <div className="form-style-5" key={post.id}>
       <form onSubmit={updateVehicle}>
       <fieldset>
       <legend><span className="number">1</span> Vehicle Info</legend>
       <input readOnly type="text" defaultValue={post.plate_no} onChange={e => setPlateno(e.target.value)} name="field1" placeholder="Plate No *" />
       <input type="text" defaultValue={post.owner} onChange={e => setOname(e.target.value)} name="field2" placeholder="Owner Name *" />
       <input type="email" defaultValue={post.email} onChange={e => setEmail(e.target.value)} name="field3" placeholder="Owner Email *" />
       <label htmlFor="job">Vehicle Type:</label>
       <select defaultValue={post.type} onChange={e => setVtype(e.target.value)} id="job" name="field4">
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
       <input type="time" defaultValue={post.time_in} onChange={e => setTimein(e.target.value)} name="field9" placeholder="Time In" />
       <label htmlFor="to">Time Out:</label>
       <input type="time" defaultValue={post.time_out} onChange={e => setTimeout(e.target.value)} name="field10" placeholder="Time Out" />     
       </fieldset>
       <fieldset>
       <legend><span className="number">2</span> Additional Info</legend>
       <input type="text" defaultValue={post.nic} onChange={e => setBrand(e.target.value)} name="field5" placeholder="Car Brand" />
       <input type="number" defaultValue={post.phone} onChange={e => setPhone(e.target.value)} name="field6" placeholder="Phone No *" />
       <input type="text" defaultValue={post.colour} onChange={e => setColour(e.target.value)} name="field7" placeholder="Colour" />
       </fieldset>
       <input type="submit" value="Apply" />
       </form>
       </div>
     )
    })}
</div>
}

export default EditVehicle;