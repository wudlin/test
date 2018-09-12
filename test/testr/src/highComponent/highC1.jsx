import React,{Component} from 'react'
import WarrpedComponet from './highComponent'

class Welcome extends Component {
    render(){
        return (
            <div>Welcome {this.props.username}</div>
        )
    }
}
Welcome = WarrpedComponet(Welcome);
export default Welcome;