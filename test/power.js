'use strict'
const {bus} = require('@theatersoft/bus')
module.exports = {
    start: f => bus.start().then(f),
    power: new Proxy({}, {get: (_, method) => (...args) => bus.proxy('Power')[method](...args).then(r => (console.log(method, r), r))})
}