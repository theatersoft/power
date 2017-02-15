'use strict'
require('@theatersoft/bus').setTime(true)
require('@theatersoft/bus').setTag('Power')
require('@theatersoft/bus').bus.start()
    .then(() => {
        const
            options = {
                module: '@theatersoft/power',
                export: 'Power',
                name: 'Power',
                config: {
                    manager: true
                }
            },
            service = new (require(options.module)[options.export])()
        console.log('starting', options)
        service.start(options)
        process.on('SIGINT', () =>
            service.stop().then(() => process.exit()))
    })
