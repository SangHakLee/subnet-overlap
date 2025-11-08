// Import dependencies
import { Addr } from 'netaddr'

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

// Export as default for browser bundle compatibility
export default subnetOverlap
