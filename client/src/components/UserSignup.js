import React , {Component} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import NavbarToHome from './NavbarToHome';
import googleicon from '../images/google-img.png'

class UserSignup extends Component{

    constructor(){
        super()

        this.state = {
            name: '',
            password: '',
            nameadded: '', 
        }

        this.nameRef = React.createRef();
        this.passRef = React.createRef();
    }

    clickHandler = async (event)=>{
        event.preventDefault();
        const response = await fetch('/user-signup', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({name: this.state.name, password: this.state.password})
        })

        const body = await response.text();
        this.setState({nameadded: body});
    }

    setName = (event)=>{
        this.setState({
            name: event.target.value,
            
        }, ()=>{
            console.log(this.state.name)
        })
    }
    
    setPass = e =>{ 
        this.setState({
            password: e.target.value
        }, ()=>{
            console.log(this.state.password)
        })
    }

    // googlesignup = ()=>{
    //     console.log('User clicked on google icon');
    //     fetch('/auth/google');
    // }

    render(){
        return(
            <>
            <NavbarToHome/>
            <div>
                <h3>SignUp</h3>
                <form className="container">
                    <label>Name: </label>
                    <input type="text" ref={this.nameRef} onChange = {this.setName}></input>
                    <label>Password: </label>
                    <input type="text" ref={this.passRef} onChange = {this.setPass}></input>
                    <button onClick={this.clickHandler}>Create User</button>
                    <p>{this.state.nameadded}</p>
                </form>
                <div>
                    Sign up with google
                    <br/>
                    <a href='http://localhost:4000/auth/google'>
                        <img src={googleicon}/>
                    </a>
                    
                </div>
                <div>Already a user? 
                    <span>
                        <Link to='/login'> Login here</Link>
                    </span>
                </div>
            </div>
            </>
        )
    }
}

export default UserSignup