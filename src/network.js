import {exec} from 'child_process'
const
    thunk = f => command => new Promise((r, j) => f(command, (error, stdout) => error ? j(error) : r(stdout.trim()))),
    _exec = thunk(exec),
    activeLink = _exec(`ip -o link |awk '$9=="UP"{print substr($2,1,length($2)-1)}'`)

export const
    wake = async mac => _exec(`etherwake ${mac} -i ${await activeLink}`),
    suspend = () => _exec(`sudo systemctl suspend`)
