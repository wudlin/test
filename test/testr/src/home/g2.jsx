import React from 'react';
// import {render} from 'react-dom';
import '../index.css';
import G2 from '@antv/g2'

class g2tb extends React.Component{
    componentDidMount(){
        this.tb()
    }
    tb(){
        const data = [
            { genre: 'Sports', sold: 275 },
            { genre: 'Strategy', sold: 1150 },
            { genre: 'Action', sold: 120 },
            { genre: 'Shooter', sold: 350 },
            { genre: 'Other', sold: 150 },
        ];
        
        const chart = new G2.Chart({
            container: 'c1',
            width: 500,
            height: 500
        });
        
        chart.source(data);
        chart.interval().position('genre*sold').color('genre');
        chart.render();
    }
    render(){
        return (
            <div id="c1"></div>
        )
    }
}

export default g2tb
