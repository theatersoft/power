// os.networkInterfaces() is useless
// read /sys/class/net/* ?

import {exec} from 'child_process'

const activeLink = new Promise(res => {
    exec(`ip -o link |awk '$9=="UP"{print substr($2,1,length($2)-1)}'`, (error, stdout) => {
        res(stdout.trim())
    })
})

export const wake = mac => new Promise(async (res, rej) => {
    exec(`etherwake ${mac} -i ${await activeLink}`, (error, stdout) => {
        if (error) rej(error)
        res(stdout.trim())
    })
})

export const suspend = () => {
    exec(`dbus-send --system --print-reply --dest=org.freedesktop.login1 /org/freedesktop/login1 org.freedesktop.login1.Manager.Suspend boolean:true`,
        (error, stdout) => {
            if (error) rej(error)
            res(stdout.trim())
        })
}