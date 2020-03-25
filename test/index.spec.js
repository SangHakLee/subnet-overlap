const debug = require('debug')('test')
const should = require('should')

const subnetOverlap = require('../index')

const overlapped = Object.freeze([
    [['172.22.2.0/24'], '172.22.2.0/24'],
])

const non_overlapped = Object.freeze([
    [['172.22.1.0/24'], '172.22.2.0/24'],
    [['172.22.1.0/24', '172.22.2.0/24'], '172.22.3.0/24'],
])

describe('subnetOverlap', () => {
    overlapped.forEach((v) => {
        it(`Overlapped: (${JSON.stringify(v[0])}, ${v[1]})`, () => {
            const r = subnetOverlap(...v)
            r.should.be.True()
        })
    })
    
    non_overlapped.forEach((v) => {
        it(`Non-overlapped: (${JSON.stringify(v[0])}, ${v[1]})`, () => {
            const r = subnetOverlap(...v)
            r.should.be.False()
        })
    })
})