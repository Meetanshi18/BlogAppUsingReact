import React from 'react'
import img from'../images/sample-1.jpg'

const Blogs = ({blogs})=>{
    const blogList = blogs.map((blog)=>{
        const key = blog.key;
        return(
            <div className="col s12 m7" key={key}>
              <h2 className="header"></h2>
              <div className="card horizontal small">
                <div className="card-image">
                  <img src={img}/>
                </div> 
                <div className="card-stacked">
                  <div className="card-content">
                    <p className="left">{blog.title}</p><br></br>
                    <p className="left">{blog.content}</p>
                    <p>{blog.key}</p>

                  </div>
                  <div className="card-action">
                    <a href="#">This is a link</a>
                  </div>
                </div>
              </div>
          </div>
        )
    })

    return (
        <div className="container">
            {blogList}
        </div>
    )
}

export default Blogs