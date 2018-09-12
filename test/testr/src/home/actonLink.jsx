import React,{Component} from 'react'
// import home from 
// import demo1 from './demo1'

class actionLink extends Component{
    constructor(props){
        super(props);
    }

    handleClick = (e)=>{
        e.preventDefault();
        console.log('this is chicked')
    }
    render(){
        // console.log(demo1)
        return(
            <div>
                <a href="https://www.baidu.com" onClick={this.handleClick}>1111</a>
            </div>
        )
    }
}
export default actionLink;
