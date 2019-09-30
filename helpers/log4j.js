var log4js = require('log4js');
var date = new Date;
var name = date.getDate()+"-"+date.getMonth()+"-"+date.getFullYear();

log4js.configure({
    appenders: { data: { 
        type: 'file', 
        filename: `${name}.log`,
        maxLogSize : 1073741824
    } },
    categories: { default: { appenders: ['data'], level: 'debug' } }
});

export default log4js.getLogger('data');
