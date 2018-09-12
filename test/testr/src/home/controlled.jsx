import React, { Component } from 'react'
import propTypes from 'prop-types';
// import {render} from 'react-dom'

const Summary = ({ control=0})=>{
    return (
        <div>{control}</div>
    )
}

class controlled extends Component{
    constructor(props){
        super(props)
        this.state={
            mood:true,
            control:'一般'
        }

    }
    handleChange=()=>{
        this.setState({
            mood:!this.state.mood
        })
        // console.log(this.props)
    }
    static propTypes = {
        control: propTypes.bool
    }
    static defaultProps={
        condition:'一般',
        control: '一般'
    }
    render(){
        let mood = this.state.mood ? '好' : '一般';
        // const { control } = this.props 
        // let control = !!condition?'好':'一般';
        
        return(
            <div>
                <Summary/>
            <p>状态:{mood}</p>
            <button onClick={this.handleChange}>change</button>
                <p>属性:{this.props.control ? '好' : '一般'}</p>
            </div>
            )
        }
    
}


export default controlled;
