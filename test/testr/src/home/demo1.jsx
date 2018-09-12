import React, { Component } from 'react'
class Demo1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            a: { 'a': 'a', 'b':' 1' }
        }
    }

    handleChange(e) {
        this.setState({
            value: e.target.value
        })
    }

    render() {
        
        let a = [{ 'a': 'a1'},{ 'a': 'a2' }]
        console.log(this.state.a)
        return (
            // <input value={this.state.value} onChange={e => this.handleChange(e)} />
            // <div>
            // {
                a.map((i,v)=>{
                    return <div key={v}>{i.a}</div>
                })
            // }
           
        )
    }
}
export default Demo1;