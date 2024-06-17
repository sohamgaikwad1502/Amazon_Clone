import {moneyConvert} from '../../js_files/utils/money.js';

if(moneyConvert(2000.5) === '20.01')  
{
    console.log("Successfull");
    console.log(Math.round(2000.5));
}
else
{
    console.log("failed");
}
