import {Type} from '@theatersoft/device'
import {ON, on, OFF, off} from './actions'
import {INIT} from './actions'

export default function reducer (state, action) {
    const {type} = action
    switch (type) {
    case INIT:
        const
            hosts = action.hosts.reduce((o, {name, host, mac}) =>
                    (o[name] = {host, mac}, o), {}),
            devices = action.hosts.reduce((o, {name}) =>
                (o[name] = {name, type: Type.Switch, id: name}, o), {})
        return {
            ...state, hosts, devices
        }
    case ON:
    case OFF:
        const
            {id} = action,
            device = state.devices[id]
        if (device && type === ON !== device.value)
            return {
                ...state,
                devices: {
                    ...state.devices,
                    [id]: {...device, value: type === ON}
                }
            }
    }
    return state
}
