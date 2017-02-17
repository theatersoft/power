import {Type, Interface, interfaceOfType} from '@theatersoft/device'

export const
    INIT = 'INIT',
    init = hosts => ({type: INIT, hosts}),
    REGISTER_HOST = 'REGISTER_HOST',
    registerHost = (name, path) => ({type: REGISTER_HOST, name, path})

export const
    ON = 'ON',
    OFF = 'OFF',
    on = id => ({type: ON, id}),
    off = id => ({type: OFF, id})

import {log} from './log'

export const
    API = 'API',
    api = action => (dispatch, getState) => {
        const
            {id, type} = action,
            device = getState().devices[id]
        if (!device) throw `no device for ${action}`
        const
            intf = interfaceOfType(device.type)
        switch (intf) {
        case Interface.SWITCH_BINARY:
        {
            switch (type) {
            case ON:
                debugger
                return
            case OFF:
                debugger
                return
            }
            return
        }
        }
    }