    import React from 'react'
    import PropTypes from 'prop-types';
    import './teat1.less'
    class teat1 extends React.Component{
      constructor(props){
        super(props);
        this.state = {};
      }
      render(){
        return (
          <div className="react-teat1">teat1</div>
        )
      }
    }
    teat1.propTypes = {}
    export default teat1