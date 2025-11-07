import subnetOverlap from '../src/subnet-overlap'

describe('subnetOverlap', () => {
	describe('Exact match - overlapped', () => {
		it('should return true for identical subnets', () => {
			expect(subnetOverlap(['172.22.2.0/24'], '172.22.2.0/24')).toBe(true)
		})

		it('should return true for identical /16 subnets', () => {
			expect(subnetOverlap(['10.0.0.0/16'], '10.0.0.0/16')).toBe(true)
		})

		it('should return true for identical /8 subnets', () => {
			expect(subnetOverlap(['10.0.0.0/8'], '10.0.0.0/8')).toBe(true)
		})
	})

	describe('Partial overlap - overlapped', () => {
		it('should return true when new subnet partially overlaps existing subnet', () => {
			expect(subnetOverlap(['172.22.0.0/16'], '172.22.2.0/24')).toBe(true)
		})

		it('should return true when existing subnet is smaller and within new subnet', () => {
			expect(subnetOverlap(['172.22.2.0/24'], '172.22.0.0/16')).toBe(true)
		})

		it('should return true for overlapping /28 subnets', () => {
			expect(subnetOverlap(['192.168.1.0/28'], '192.168.1.0/28')).toBe(true)
		})
	})

	describe('Complete containment - overlapped', () => {
		it('should return true when new subnet is completely contained', () => {
			expect(subnetOverlap(['10.0.0.0/8'], '10.1.2.0/24')).toBe(true)
		})

		it('should return true when existing subnet is completely contained', () => {
			expect(subnetOverlap(['10.1.2.0/24'], '10.0.0.0/8')).toBe(true)
		})

		it('should return true for /32 within /24', () => {
			expect(subnetOverlap(['192.168.1.0/24'], '192.168.1.1/32')).toBe(true)
		})

		it('should return true for nested private subnets', () => {
			expect(subnetOverlap(['172.16.0.0/12'], '172.20.1.0/24')).toBe(true)
		})
	})

	describe('Multiple existing subnets - overlapped', () => {
		it('should return true when overlapping with first subnet', () => {
			expect(subnetOverlap(['172.22.1.0/24', '172.22.2.0/24'], '172.22.1.0/24')).toBe(true)
		})

		it('should return true when overlapping with second subnet', () => {
			expect(subnetOverlap(['172.22.1.0/24', '172.22.2.0/24'], '172.22.2.0/24')).toBe(true)
		})

		it('should return true when overlapping with any of multiple subnets', () => {
			expect(subnetOverlap(['10.0.0.0/24', '172.16.0.0/24', '192.168.0.0/24'], '172.16.0.128/25')).toBe(true)
		})

		it('should return true with many existing subnets', () => {
			const existingSubnets = [
				'10.0.0.0/24',
				'10.1.0.0/24',
				'10.2.0.0/24',
				'172.16.0.0/24',
				'192.168.1.0/24'
			]
			expect(subnetOverlap(existingSubnets, '192.168.1.128/25')).toBe(true)
		})
	})

	describe('No overlap - non-overlapped', () => {
		it('should return false for completely different /24 subnets', () => {
			expect(subnetOverlap(['172.22.1.0/24'], '172.22.2.0/24')).toBe(false)
		})

		it('should return false when no existing subnet overlaps', () => {
			expect(subnetOverlap(['172.22.1.0/24', '172.22.2.0/24'], '172.22.3.0/24')).toBe(false)
		})

		it('should return false for adjacent subnets', () => {
			expect(subnetOverlap(['192.168.1.0/24'], '192.168.2.0/24')).toBe(false)
		})

		it('should return false for different /16 ranges', () => {
			expect(subnetOverlap(['10.0.0.0/16'], '10.1.0.0/16')).toBe(false)
		})

		it('should return false for different private IP ranges', () => {
			expect(subnetOverlap(['10.0.0.0/8'], '172.16.0.0/12')).toBe(false)
		})

		it('should return false for non-overlapping /28 subnets', () => {
			expect(subnetOverlap(['192.168.1.0/28'], '192.168.1.16/28')).toBe(false)
		})

		it('should return false with multiple non-overlapping subnets', () => {
			expect(subnetOverlap(['10.0.0.0/24', '10.1.0.0/24', '10.2.0.0/24'], '10.3.0.0/24')).toBe(false)
		})
	})

	describe('Various CIDR block sizes', () => {
		it('should handle /8 subnet', () => {
			expect(subnetOverlap(['10.0.0.0/8'], '10.255.255.255/32')).toBe(true)
		})

		it('should handle /12 subnet', () => {
			expect(subnetOverlap(['172.16.0.0/12'], '172.31.255.255/32')).toBe(true)
		})

		it('should handle /16 subnet', () => {
			expect(subnetOverlap(['192.168.0.0/16'], '192.168.255.0/24')).toBe(true)
		})

		it('should handle /20 subnet', () => {
			expect(subnetOverlap(['10.0.0.0/20'], '10.0.15.0/24')).toBe(true)
		})

		it('should handle /28 subnet', () => {
			expect(subnetOverlap(['192.168.1.0/28'], '192.168.1.15/32')).toBe(true)
		})

		it('should handle /30 subnet (point-to-point)', () => {
			expect(subnetOverlap(['192.168.1.0/30'], '192.168.1.1/32')).toBe(true)
		})

		it('should handle /32 subnet (single host)', () => {
			expect(subnetOverlap(['192.168.1.1/32'], '192.168.1.1/32')).toBe(true)
		})
	})

	describe('Private IP address ranges', () => {
		it('should handle Class A private range (10.0.0.0/8)', () => {
			expect(subnetOverlap(['10.0.0.0/8'], '10.128.0.0/16')).toBe(true)
			expect(subnetOverlap(['10.0.0.0/8'], '11.0.0.0/8')).toBe(false)
		})

		it('should handle Class B private range (172.16.0.0/12)', () => {
			expect(subnetOverlap(['172.16.0.0/12'], '172.20.0.0/16')).toBe(true)
			expect(subnetOverlap(['172.16.0.0/12'], '172.32.0.0/16')).toBe(false)
		})

		it('should handle Class C private range (192.168.0.0/16)', () => {
			expect(subnetOverlap(['192.168.0.0/16'], '192.168.100.0/24')).toBe(true)
			expect(subnetOverlap(['192.168.0.0/16'], '192.169.0.0/24')).toBe(false)
		})
	})

	describe('Edge cases', () => {
		it('should return false for empty existing subnets array', () => {
			expect(subnetOverlap([], '172.22.2.0/24')).toBe(false)
		})

		it('should handle single IP address (/32) comparisons', () => {
			expect(subnetOverlap(['192.168.1.1/32'], '192.168.1.1/32')).toBe(true)
			expect(subnetOverlap(['192.168.1.1/32'], '192.168.1.2/32')).toBe(false)
		})

		it('should handle very large subnet (/0 would be entire internet)', () => {
			expect(subnetOverlap(['0.0.0.0/1'], '128.0.0.0/1')).toBe(false)
			expect(subnetOverlap(['0.0.0.0/1'], '64.0.0.0/2')).toBe(true)
		})
	})

	describe('Error handling', () => {
		it('should throw TypeError if existedCidrs is not an array', () => {
			expect(() => subnetOverlap('not-an-array' as any, '172.22.2.0/24')).toThrow(TypeError)
			expect(() => subnetOverlap('not-an-array' as any, '172.22.2.0/24')).toThrow('existed_cidrs must be Array type.')
		})

		it('should throw TypeError if nowCidr is not a string', () => {
			expect(() => subnetOverlap(['172.22.2.0/24'], 123 as any)).toThrow(TypeError)
			expect(() => subnetOverlap(['172.22.2.0/24'], 123 as any)).toThrow('now_cidr must be String type.')
		})

		it('should throw TypeError if existedCidrs is null', () => {
			expect(() => subnetOverlap(null as any, '172.22.2.0/24')).toThrow(TypeError)
		})

		it('should throw TypeError if existedCidrs is undefined', () => {
			expect(() => subnetOverlap(undefined as any, '172.22.2.0/24')).toThrow(TypeError)
		})

		it('should throw TypeError if nowCidr is null', () => {
			expect(() => subnetOverlap(['172.22.2.0/24'], null as any)).toThrow(TypeError)
		})

		it('should throw TypeError if nowCidr is undefined', () => {
			expect(() => subnetOverlap(['172.22.2.0/24'], undefined as any)).toThrow(TypeError)
		})
	})

	describe('Real-world scenarios', () => {
		it('should detect overlap in typical AWS VPC subnets', () => {
			const awsVpc = ['10.0.0.0/16']
			expect(subnetOverlap(awsVpc, '10.0.1.0/24')).toBe(true)
			expect(subnetOverlap(awsVpc, '10.1.0.0/24')).toBe(false)
		})

		it('should detect overlap in typical office network', () => {
			const officeSubnets = ['192.168.10.0/24', '192.168.20.0/24', '192.168.30.0/24']
			expect(subnetOverlap(officeSubnets, '192.168.10.0/25')).toBe(true)
			expect(subnetOverlap(officeSubnets, '192.168.40.0/24')).toBe(false)
		})

		it('should detect overlap in Kubernetes pod CIDR', () => {
			const k8sPodCidr = ['10.244.0.0/16']
			expect(subnetOverlap(k8sPodCidr, '10.244.1.0/24')).toBe(true)
			expect(subnetOverlap(k8sPodCidr, '10.245.0.0/16')).toBe(false)
		})

		it('should handle Docker default bridge network', () => {
			const dockerBridge = ['172.17.0.0/16']
			expect(subnetOverlap(dockerBridge, '172.17.0.0/24')).toBe(true)
			expect(subnetOverlap(dockerBridge, '172.18.0.0/16')).toBe(false)
		})
	})
})
