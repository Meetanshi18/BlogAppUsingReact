import React, {Component} from 'react'
import NavbarToHome from './NavbarToHome';
import {Redirect} from 'react-router-dom'
import img from'../images/sample-1.jpg'
//import ProfileBlogs from './ProfileBlogs';

class Profile extends Component{

    constructor(){
        super()

        let loggedIn = true;
        if(localStorage.getItem('token') == null){
            loggedIn = false
        }
        this.state = {
            name: '',
            title: '',
            content: '',
            blogs: [],
            btntext: 'Add Blog!',
            loggedIn
        }
    }

    setTitle = (e)=>{
        this.setState({
            title: e.target.value
        })
    }
    setContent = (e)=>{
        this.setState({
            content: e.target.value
        })
    }

    submitHandler = async(e)=>{
        e.preventDefault();

        const response = await fetch('/profile/add-blog', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({author: this.state.name, title: this.state.title, content: this.state.content})
        });
        console.log('hello2');
        //console.log(response);
        const body = await response.text();
        console.log(body);

        this.setState({
            title: '',
            content: '',
            btntext: 'Blog Added, Add another one!'
        })
    }

    async componentDidMount(){
        const token = localStorage.getItem('token');

        const response = await fetch('/profiledetails', {
            method: 'POST',
            headers : {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({token: token})
        })

        const body = await response.json();
        this.setState({ 
            name: body.name,
            blogs: body.blogs
        })

        const blogList = this.state.blogs.map((blog)=>{
            const key = blog._id;
            return(
                <li className="collection-item" key={key}>
                    <a href="">{blog.title}</a>
                    <br/>
                    <span>
                        {blog.content}    
                    </span>
                </li> 
            )
        })
        
        this.setState({
            blogList
        })
    }
    
    
    render(){

        if(!this.state.loggedIn){
            return (
                <Redirect to='/login'></Redirect>
            )
        }
        
        return(
            <>
            
            <div className="row">
            <nav className="blue" style={{'marginBottom': 25 + 'px'}}>
                <div className="nav-wrapper">
                    <div className="container">
                        <h3 style={{'marginTop': 0 + 'px', 'paddingTop': 5 + 'px'}}>
                            Welcome back! {this.state.name}   
                        </h3>
                    </div>
                </div>
            </nav>

            <div className="content">
                <div className="row">
                    <div className="col s12 l4 m4">
                        <div className="card-panel center">
                            
                            <h5>Users Online  </h5>
                            <img src={img} style={{height: 300 + 'px'}} />
                            
                            <br/>
                            </div>
                        </div>
                        <div className="col s12 l4 m4">
                            <div className="card-panel center">
                                <h5>Views</h5>
                                <img src={img} style={{height: 300 + 'px'}} />
                            </div>
                        </div>
                        <div className="col s12 l4 m4">
                            <div className="card-panel center">
                                <h5>Metrics</h5>
                                <img src={img} style={{height: 300 + 'px'}} />
                            </div>
                        </div>
                        
      
                    </div>
                </div>
            
            <div className="row center container light-blue lighten-5 ">
                <form className="row container" onSubmit={this.submitHandler} style={{'paddingTop': 15 + 'px'}}>
                    <div className="row">
                        <div className="input-field">
                        <input type="text" onChange={this.setTitle} placeholder="title" value={this.state.title}/>
                        
                        </div>                    
                    </div>
                    <div className="row">                        
                        <div className="row">
                            <div className="input-field">
                            <input type="text" onChange={this.setContent} placeholder="content" value={this.state.content}/>
                            
                            </div>
                        </div>                        
                    </div>
                    <button type="submit" className="btn">{this.state.btntext}</button>
                </form>
            </div>
            

            

            <div className="row">

                <div className="col l6 m6 s12">
                    <ul className="collection with-header">
                        <li className="collection-header blue">
                            <h5 className="white-text">Recently Added Blogs</h5>
                            
                        </li>
                        {/* <li className="collection-item">
                            <a href="">Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium pariatur nulla impedit voluptate porro? Iste!</a>
                            <br/>
                            <span>
                            <i className="material-icons tiny blue-text text-darken-4">edit</i> Edit |
                            <i className="material-icons tiny red-text text-darken-4" >close</i> Delete |
                            <i className="material-icons tiny green-text text-darken-4">share</i> Share

                            </span>
                        </li>                   */}
                        {this.state.blogList}
                    
                    
                    </ul>
            </div>

            <div className="col l6 m6 s12">
                    <ul className="collection with-header">
                        <li className="collection-header blue">
                            <h5 className="white-text">Recent Comments</h5>
                            
                        </li>
                        <li className="collection-item">
                            <h6>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, fugiat.</h6>
                        
                        <a href="">
                            <span>
                                <i className="material-icons tiny blue-text text-darken-4">done</i> Approve|
                                <i className="material-icons tiny red-text text-darken-4" >close</i> Remove
                                </span>
                        </a>
                        </li>      
                    </ul>
            </div>
        </div>
                    

            </div>
            </>
        )
        
    }
}

export default Profile