'use strict'
const {start, power} = require('./power')
start(async () => {
    try {
        await power.wake('files')
        //power.suspend()
    }
    catch (e) {console.log(e)}
})

