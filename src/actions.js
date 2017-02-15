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
