import React,{Component} from 'react';


export default (WarrpedComponet)=>{
    class NewComponent extends Component{
        constructor(){
            super()
            this.state={
                username:''
            }
        }
        componentDidMount(){
            let username = 'zhangsan';
            this.setState({
                username
            })
        }
        render(){
            return <WarrpedComponet username={this.state.username}/>
        }
    }
    return NewComponent
}