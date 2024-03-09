export function moneyConvert(priceCents)
{
    const price = (Math.round(priceCents / 100)).toFixed(2);
    return price;
}
export default moneyConvert;