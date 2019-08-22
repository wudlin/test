    import React from 'react';
    import ReactDom from 'react-dom';
    import KN from '../src/index';
    class Demo extends React.Component {
      constructor(props) {
        super(props);
        this.state = {};
      }
      render(){
         return(
          <div>
          <h1>组件预览：</h1>
            <KN />
        </div>
         );
      }
    }
    ReactDom.render(<Demo />, document.getElementById('root'));