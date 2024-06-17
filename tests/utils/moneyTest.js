import {moneyConvert} from '../../js_files/utils/money.js';

describe('test suite : formatCurrency',()=> {
    it('converts cents into dollars',()=> {
        expect(moneyConvert(2095)).toEqual('20.95');
    });

    it('works with 0 ',()=>{
        expect(moneyConvert(0)).toEqual('0.00');
    });
    it('rounds up to nearest cent' , ()=>
    {
        expect(moneyConvert(2000.5)).toEqual('20.01');
    });
    
});

