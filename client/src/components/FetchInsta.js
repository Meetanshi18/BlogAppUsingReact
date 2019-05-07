import React , {Component} from 'react'


class FetchInsta extends Component{

    constructor(){
        super()
    }

        
    render(){
        return(
            <div>
                <a href='https://api.instagram.com/oauth/authorize/?client_id=2d83432f66ba45a382db5c58c7fcc2c8&redirect_uri=http://localhost:3000&response_type=token' target='_blank'>Click Here</a>
            </div>
        )
    }
}

export default FetchInsta