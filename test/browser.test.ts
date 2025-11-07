import puppeteer, { Browser, Page } from 'puppeteer'
import * as path from 'path'
import * as fs from 'fs'

// Type declaration for window in page.evaluate context
declare global {
	interface Window {
		subnetOverlap: (existedCidrs: string[], nowCidr: string) => boolean
	}
}

describe('Browser environment tests', () => {
	let browser: Browser
	let page: Page
	const browserBundlePath = path.join(__dirname, '..', 'dist', 'browser', 'subnetOverlap.min.js')

	beforeAll(async () => {
		// Skip tests if browser bundle doesn't exist yet
		if (!fs.existsSync(browserBundlePath)) {
			console.warn('Browser bundle not found. Skipping browser tests.')
			return
		}

		browser = await puppeteer.launch({
			headless: true,
			args: ['--no-sandbox', '--disable-setuid-sandbox']
		})
		page = await browser.newPage()

		// Load the browser bundle
		await page.addScriptTag({ path: browserBundlePath })
	})

	afterAll(async () => {
		if (browser) {
			await browser.close()
		}
	})

	// Skip all tests if browser bundle doesn't exist
	const testIf = (condition: boolean) => (condition ? it : it.skip)
	const bundleExists = fs.existsSync(browserBundlePath)

	testIf(bundleExists)('should expose subnetOverlap as a global function', async () => {
		const hasGlobalFunction = await page.evaluate(() => {
			return typeof (window as any).subnetOverlap === 'function'
		})
		expect(hasGlobalFunction).toBe(true)
	})

	testIf(bundleExists)('should correctly detect overlapping subnets in browser', async () => {
		const result = await page.evaluate(() => {
			return (window as any).subnetOverlap(['172.22.2.0/24'], '172.22.2.0/24')
		})
		expect(result).toBe(true)
	})

	testIf(bundleExists)('should correctly detect non-overlapping subnets in browser', async () => {
		const result = await page.evaluate(() => {
			return (window as any).subnetOverlap(['172.22.1.0/24'], '172.22.2.0/24')
		})
		expect(result).toBe(false)
	})

	testIf(bundleExists)('should handle multiple existing subnets in browser', async () => {
		const result = await page.evaluate(() => {
			const existed = ['172.22.1.0/24', '172.22.2.0/24', '172.22.3.0/24']
			return (window as any).subnetOverlap(existed, '172.22.2.0/24')
		})
		expect(result).toBe(true)
	})

	testIf(bundleExists)('should handle empty array in browser', async () => {
		const result = await page.evaluate(() => {
			return (window as any).subnetOverlap([], '172.22.2.0/24')
		})
		expect(result).toBe(false)
	})

	testIf(bundleExists)('should throw TypeError for invalid input in browser', async () => {
		const errorThrown = await page.evaluate(() => {
			try {
				(window as any).subnetOverlap('not-an-array', '172.22.2.0/24')
				return false
			} catch (e) {
				return e instanceof TypeError
			}
		})
		expect(errorThrown).toBe(true)
	})

	testIf(bundleExists)('should work with various CIDR sizes in browser', async () => {
		const results = await page.evaluate(() => {
			const testCases = [
				{ existed: ['10.0.0.0/8'], now: '10.1.0.0/16', expected: true },
				{ existed: ['192.168.0.0/16'], now: '192.168.1.0/24', expected: true },
				{ existed: ['172.16.0.0/12'], now: '172.32.0.0/16', expected: false }
			]

			return testCases.map(tc => ({
				...tc,
				result: (window as any).subnetOverlap(tc.existed, tc.now)
			}))
		})

		results.forEach((test: any) => {
			expect(test.result).toBe(test.expected)
		})
	})
})
