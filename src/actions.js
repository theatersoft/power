import {Type, Interface, interfaceOfType} from '@theatersoft/device'

export const
    INIT = 'INIT',
    init = hosts => ({type: INIT, hosts})

export const
    ON = 'ON',
    OFF = 'OFF',
    on = id => ({type: ON, id}),
    off = id => ({type: OFF, id})
