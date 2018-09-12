
import DateSet from '@antv/data-set';


let dateSet = {
     states(){
        let da = new DateSet({
        state: {
                a: 'b'
            }
        })
        return da.state
    }
};


export default dateSet;
