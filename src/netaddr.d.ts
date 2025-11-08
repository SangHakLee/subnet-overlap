// Type definitions for netaddr
declare module 'netaddr' {
	export interface AddrInstance {
		intersect(other: AddrInstance): AddrInstance | null
		toString(): string
	}

	export interface AddrConstructor {
		(cidr: string): AddrInstance
	}

	export const Addr: AddrConstructor
}
