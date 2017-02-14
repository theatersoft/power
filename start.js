'use strict'
require('@theatersoft/bus').setTime(true)
require('@theatersoft/bus').setTag('Host')
require('@theatersoft/bus').bus.start()
    .then(bus =>
        bus.proxy('Config').get()
            .then(config => {
                console.log('config', config)
                const
                    options = {
                        module: '@theatersoft/host',
                        export: 'Host',
                        name: 'Host',
                        config: {
                            manager: true,
                            hosts: config.hosts.map(({name, host, mac}) => ({name, host, mac}))
                        }
                    },
                    service = new (require(options.module)[options.export])()
                console.log('starting', options)
                service.start(options)
                process.on('SIGINT', () =>
                    service.stop().then(() => process.exit()))
            }))
