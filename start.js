'use strict'
require('@theatersoft/bus').setTime(true)
require('@theatersoft/bus').setTag('Host')
require('@theatersoft/bus').bus.start()
    .then(() => {
        const
            options = {
                module: '@theatersoft/host',
                export: 'Host',
                name: 'Host',
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
