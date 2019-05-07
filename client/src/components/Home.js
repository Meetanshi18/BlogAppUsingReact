import React, { Component } from 'react';
// import UserSignup from './UserSignup';
// import FetchInsta from './FetchInsta';
// import FetchTrial from './FetchTrial';
// import UserLogin from './UserLogin';
// import Profile from './Profile';
import Navbar from './Navbar';
import Blogs from './Blogs'


class Home extends Component {
  constructor(){
    super()

    this.state = {
      blogs: [
        // {author: 'meetanshi', content: 'how to be good at programming'},
        // {author: 'ananya', content: 'how to make friends'},
        // {author: 'soumya', content: 'how to think creatively'}
      ]
    }
  }


  async componentDidMount(){
     
    fetch('/blogs').then(res=>res.json()).then(blogsarray=>{
      //console.log(blogsarray);

      const array = blogsarray.map(blog=>{
        console.log(blog)
        return {
          author: blog.author,
          title: blog.title,
          content: blog.content,
          key: blog._id
        }
      })
      
      console.log(array)
      this.setState({
        blogs: array
      })
    })
  }

  render() {
    
      return (
        <div className="App">
          <Navbar></Navbar>
          <h1>BLOG TRIAL</h1>

          <Blogs blogs={this.state.blogs} class="center"></Blogs>
          {/* <UserSignup></UserSignup>
          <FetchTrial></FetchTrial>
          <UserLogin></UserLogin> */}
          
        </div>
      )
    

  }
}

export default Home;
