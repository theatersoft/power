import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'remote-redux-devtools'
import reducer from './reducer'
import {bus} from '@theatersoft/bus'
import {initDevices} from './actions'
import {log} from './log'

import os from 'os'
const master = () => os.hostname

export class Power {
    start ({name, config: {devices, remotedev: hostname = 'localhost'}}) {
        hostname = os.hostname()
        log(hostname)
        this.name = name
        return bus.registerObject(name, this)
            .then(obj => {
                this.store = createStore(
                    reducer,
                    {devices: {}},
                    (composeWithDevTools({name, realtime: true, port: 6400, hostname}) || (x => x))
                    (applyMiddleware(thunk.withExtraArgument({})))
                )
                this.store.dispatch(initDevices(devices))
                this.store.subscribe(() =>
                    obj.signal('state', this.store.getState()))
                const register = () => bus.proxy('Device').registerService(this.name)
                bus.registerListener(`Device.start`, register)
                bus.on('reconnect', register)
                register()
            })
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
