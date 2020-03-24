
const IPCIDR = require('ip-cidr')
const Addr = require('netaddr').Addr

module.exports = function(existed_cidrs, now_cidr) {
    if (!Array.isArray(existed_cidrs)) throw new TypeError('existed_cidrs must be Array type.')
    if (typeof now_cidr !== 'string') throw new TypeError('now_cidr must be String type.')

    if (!existed_cidrs.length) return false

    const now_cidr_subnet = Addr(now_cidr)
    for (const cidr of existed_cidrs) {
        // console.log('cidrs', cidrs)
        const cidr_subnet = Addr(cidr)
        const subnet_intersect = cidr_subnet.intersect(now_cidr_subnet)

        if (subnet_intersect) {
            // const overlapped_cidr = new IPCIDR(subnet_intersect.toString())
            // // console.log('subnet_intersect', overlapped_cidr.toString())
            // return overlapped_cidr.toString()
            return true
        }
    }

    return false
}