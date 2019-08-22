import React from 'react';
import PropTypes from 'prop-types';
import './KN.less';
class KN extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  render(){
    return <div className='react-KN'>KN</div>;
  }
}
KN.propTypes = {
    name: PropTypes.string
};
export default KN;