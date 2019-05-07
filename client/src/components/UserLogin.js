import React , {Component} from 'react'
import Profile from './Profile'
import {Link, Redirect} from 'react-router-dom'
import NavbarToHome from './NavbarToHome'


class UserLogin extends Component{
    constructor(){
        super()

        let isLoggedIn = false;
        if(localStorage.getItem('token')!=null){
            isLoggedIn = true
        }

        const element = (
                <div>
                    <Link to='/profile'>Go to profile</Link>
                </div>
            )
            
        this.state = {
            name: '',
            password: '',
            isLoggedIn,
            element
        }

    }

    clickHandler = async (event)=>{
        event.preventDefault();
        const response = await fetch('/user-login', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({name: this.state.name, password: this.state.password, isloggedIn: this.state.isLoggedIn})
        })

        console.log(response);
        const body = await response.text();
        console.log(JSON.parse(body).string);
        
        this.setState({status: JSON.parse(body).string, isLoggedIn: JSON.parse(body).isLoggedIn});
        if(this.state.isLoggedIn){

            localStorage.setItem('token', JSON.parse(body).token);
            
        } else {
            const element = (
                <div>
                    <span>Please enter your credentials correctly</span>
                </div>
            )
            this.setState({
                element
            })
        }
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

    render(){
            
            if(this.state.isLoggedIn){
                return(
                    <Redirect to="/profile"></Redirect>
                )
            }
        
            return(
                <>
                <NavbarToHome/>
                <div class="container">
                    <h1>LOGIN</h1>
                    <form>
                        <label>Name: </label>
                        <input type="text" ref={this.nameRef} onChange = {this.setName}></input>
                        <label>Password: </label>
                        <input type="text" ref={this.passRef} onChange = {this.setPass}></input>
                        <button onClick={this.clickHandler}>Login</button>
                        <p>{this.state.status}</p>
                        
                    </form>
                    <div>Not a user? 
                        <span>
                            <Link to='/signup'> Register here</Link>
                        </span>
                    </div>
                    
                    {this.state.element}
                        
                    
                    
                </div>
                </>
            )
        
        
        
    }
}

export default UserLogin

