export const randomNumber = (length) => {
    if(!length){
        length = 6;
    }
    let random = Number(Math.random()).toFixed(6);
    return Math.floor(random * ((Math.pow(10, length) - 1) - Math.pow(10, length - 1) + 1)) + Math.pow(10, length - 1);
};