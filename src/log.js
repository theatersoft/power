import * as base from '@theatersoft/bus'

const format = (...args) => (['HOST', ...args])

export const log = (...args) => base.log(...format(...args))
export const error = (...args) => base.error(...format(...args))