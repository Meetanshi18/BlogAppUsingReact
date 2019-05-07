import React from 'react'
import {Link} from 'react-router-dom'

const Navbar = ()=>{
    return(
        <nav>
            <div className="nav-wrapper">
            <ul className="right hide-on-med-and-down">
                <li><Link  to='/signup' className="waves-effect waves-light btn">Signup</Link></li>
                <li><Link to='/login' className="waves-effect waves-light btn">Login </Link></li>
            </ul>
            </div>
        </nav>
    )
}

export default Navbar