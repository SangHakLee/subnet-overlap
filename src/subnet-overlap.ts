// Type definitions for external dependencies
interface AddrInstance {
	intersect(other: AddrInstance): AddrInstance | null
	toString(): string
}

interface AddrConstructor {
	(cidr: string): AddrInstance
}

// Import dependencies
// eslint-disable-next-line @typescript-eslint/no-require-imports
const Addr: AddrConstructor = require('netaddr').Addr

/**
 * Check if a subnet overlaps with any existing subnets
 * @param existedCidrs - Array of existing subnet CIDR notations
 * @param nowCidr - The subnet CIDR notation to check
 * @returns true if there is an overlap, false otherwise
 * @throws {TypeError} If existedCidrs is not an array or nowCidr is not a string
 */
function subnetOverlap(existedCidrs: string[], nowCidr: string): boolean {
	if (!Array.isArray(existedCidrs)) {
		throw new TypeError('existed_cidrs must be Array type.')
	}
	if (typeof nowCidr !== 'string') {
		throw new TypeError('now_cidr must be String type.')
	}

	if (!existedCidrs.length) {
		return false
	}

	const nowCidrSubnet = Addr(nowCidr)
	for (const cidr of existedCidrs) {
		const cidrSubnet = Addr(cidr)
		const subnetIntersect = cidrSubnet.intersect(nowCidrSubnet)

		if (subnetIntersect) {
			return true
		}
	}

	return false
}

// Export for both ESM and CommonJS
export { subnetOverlap }
export default subnetOverlap

// CommonJS compatibility
module.exports = subnetOverlap
module.exports.subnetOverlap = subnetOverlap
module.exports.default = subnetOverlap
