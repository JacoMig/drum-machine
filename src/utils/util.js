export function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
   }   

export const isTouchDevice = () => {
    return typeof window.ontouchstart !== 'undefined';
}