
export const encrypt = (data) => {
    let b64Data = Buffer.from(JSON.stringify(data)).toString('base64');
    return b64Data;
}
export const decrypt = (data) => {
    let binaryData = Buffer.from(data, 'base64').toString();
    return binaryData;
}   
