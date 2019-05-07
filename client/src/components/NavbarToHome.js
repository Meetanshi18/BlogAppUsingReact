import React from 'react'
import {Link} from 'react-router-dom'

const NavbarToHome = ()=>{
    return(
        <nav>
            <div className="nav-wrapper">
            <ul className="right hide-on-med-and-down">
                <li><Link  to='/' className="waves-effect waves-light btn">Home</Link></li>                
            </ul>
            </div>
        </nav>
    )
}

export default NavbarToHome