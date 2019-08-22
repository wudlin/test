    import React from 'react';
    import ReactDom from 'react-dom';
    import KY from '../src/index';
    class Demo extends React.Component {
      constructor(props) {
        super(props);
        this.state = {};
      }
      render(){
         return(
          <div>
          <h1>组件预览：</h1>
            <KY />
        </div>
         );
      }
    }
    ReactDom.render(<Demo />, document.getElementById('root'));