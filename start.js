'use strict'
require('@theatersoft/bus').bus.start()
    .then(bus =>
        bus.proxy('Config').get()
            .then(config => {
                const
                    options = {
                        module: '@theatersoft/power',
                        export: 'Power',
                        name: 'Power',
                        config: {
                            devices: config.Hosts.map(({Name: name, host, Mac: mac}) => ({name, host, mac}))
                        }
                    },
                    service = new (require(options.module)[options.export])()
                service.start(options)
                process.on('SIGINT', () =>
                    service.stop().then(() => process.exit()))
            }))
