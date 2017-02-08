import {Type, Interface, interfaceOfType} from '@theatersoft/device'

export const
    INIT_DEVICES = 'INIT_DEVICES',
    initDevices = devices => ({type: INIT_DEVICES, devices})

export const
    ON = 'ON',
    OFF = 'OFF',
    on = id => ({type: ON, id}),
    off = id => ({type: OFF, id})
