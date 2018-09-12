import React from 'react';
import copy from 'copy-to-clipboard'

class copyCont extends React.Component {
    setmsg(aa){
        copy(aa)
        console.log('success')
    }
    render(){
        return (
            <div onClick={this.setmsg(111)}>1111</div>
        )
    }
}

export default copyCont;