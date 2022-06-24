import React, {useEffect, useState} from "react";
import '../css/login.css'
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const URL = "http://localhost:6900/api/user/login"

	const authenticateUser = event => {
		console.log("Submit clicked");
		console.log("email 👉️", email);
		console.log("password 👉️", password);
		event.preventDefault();
		const user = { 
		"username": email,
		"password": password
		};
		axios.post(URL, user)
			.then(response => {
				if(response.status == 200) {
					localStorage.setItem("username", response.data.username);
					localStorage.setItem("access-token", response.data.accessToken);
					navigate("/home");
					console.log(response.data)
				}
			})
			.catch(error => {
				//this.setState({ errorMessage: error.message });
				console.error('There was an error!', error);
				alert("Invalid username or password");
			});
	}

    return <div className="login-page">
        <div className="main">  	
		<input type="checkbox" id="chk" aria-hidden="true" />

			<div className="signup">
				<form>
					<label htmlFor="chk" aria-hidden="true">Sign up</label>
					<input type="text" name="txt" placeholder="User name" required="" />
					<input type="email" name="email" placeholder="Email" required="" />
					<input type="password" name="pswd" placeholder="Password" required="" />
					<button>Sign up</button>
				</form>
			</div>

			<div className="login">
				<form onSubmit={authenticateUser} >
					<label htmlFor="chk" aria-hidden="true">Login</label>
					<input type="text" onChange={e => setEmail(e.target.value)} value={email} name="email" placeholder="Email" required="" />
					<input type="password" onChange={e => setPassword(e.target.value)} value={password} name="pswd" placeholder="Password" required="" /> 
					<button type="submit">Login</button>
				</form>
			</div>
	</div>

    </div>

}

export default Login;

