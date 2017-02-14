import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'remote-redux-devtools'
import reducer from './reducer'
import {bus} from '@theatersoft/bus'
import {init} from './actions'
import {log} from './log'
import os from 'os'

export class Host {
    async start ({name, config: {devices, remotedev = 'localhost'}}) {
        this.name = name
        const
            {hosts} = await bus.proxy('Config').get(),
            hostname = os.hostname(),
            host = hosts.find(h => h.name === hostname)

        this.root = host && host.root
        if (this.root) {
            const obj = await bus.registerObject(name, this)
            this.store = createStore(reducer, {devices: {}},
                (composeWithDevTools({name, realtime: true, port: 6400, hostname: remotedev}) || (x => x))
                (applyMiddleware(thunk.withExtraArgument({})))
            )
            this.store.dispatch(init(hosts))
            this.store.subscribe(() =>
                obj.signal('state', this.store.getState()))
            const register = () => bus.proxy('Device').registerService(this.name)
            bus.registerListener(`Device.start`, register)
            bus.on('reconnect', register)
            await register()
        }
    }

    stop () {
        return bus.unregisterObject(this.name)
    }

    dispatch (action) {
        return this.store.dispatch(api(action))
    }

    getState () {
        return this.store.getState()
    }
}
