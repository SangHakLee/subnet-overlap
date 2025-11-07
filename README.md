# subnet-overlap

[![npm version](https://badge.fury.io/js/subnet-overlap.svg)](https://badge.fury.io/js/subnet-overlap)
[![CI](https://github.com/SangHakLee/subnet-overlap/actions/workflows/node.js.yml/badge.svg)](https://github.com/SangHakLee/subnet-overlap/actions/workflows/node.js.yml)
[![codecov](https://codecov.io/gh/SangHakLee/subnet-overlap/branch/master/graph/badge.svg)](https://codecov.io/gh/SangHakLee/subnet-overlap)
[![semantic-release: conventionalcommits](https://img.shields.io/badge/semantic--release-conventionalcommits-1890ff?logo=semantic-release)](https://github.com/semantic-release/semantic-release)

[![NPM](https://nodei.co/npm/subnet-overlap.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/is-0/)

Check if subnets overlap with existing subnets. Works in both Node.js and browser environments.

## Installation

### npm

```bash
npm install subnet-overlap
```

### GitHub Packages

```bash
npm install @SangHakLee/subnet-overlap --registry=https://npm.pkg.github.com
```

## Usage

### Node.js

```javascript
const subnetOverlap = require('subnet-overlap')

// Check if subnet overlaps with existing subnets
subnetOverlap(['172.22.2.0/24'], '172.22.2.0/24')  // true
subnetOverlap(['172.22.1.0/24'], '172.22.2.0/24')  // false

// Check against multiple existing subnets
subnetOverlap(
  ['10.0.0.0/24', '172.16.0.0/24', '192.168.0.0/24'],
  '172.16.0.128/25'
)  // true
```

### TypeScript

```typescript
import subnetOverlap from 'subnet-overlap'

const hasOverlap: boolean = subnetOverlap(['10.0.0.0/16'], '10.0.1.0/24')
```

### Browser

```html
<!-- unpkg -->
<script src="https://unpkg.com/subnet-overlap@latest/dist/browser/subnetOverlap.min.js"></script>

<!-- jsdelivr -->
<script src="https://cdn.jsdelivr.net/npm/subnet-overlap@latest/dist/browser/subnetOverlap.min.js"></script>

<script>
  console.log(subnetOverlap(['172.22.2.0/24'], '172.22.2.0/24'))  // true
  console.log(subnetOverlap(['172.22.1.0/24'], '172.22.2.0/24'))  // false
</script>
```

## API

### subnetOverlap(existedCidrs, nowCidr)

Returns `true` if `nowCidr` overlaps with any subnet in `existedCidrs`, `false` otherwise.

#### Parameters

- **existedCidrs** `Array<string>` - Array of existing subnet CIDR notations
- **nowCidr** `string` - The subnet CIDR notation to check

#### Returns

`boolean` - `true` if there is an overlap, `false` otherwise

#### Throws

- `TypeError` - If `existedCidrs` is not an array or `nowCidr` is not a string

## Documentation

Full API documentation is available at [GitHub Pages](https://SangHakLee.github.io/subnet-overlap/).

## Development

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Build browser bundle
npm run build:browser

# Run tests
npm test

# Run tests with coverage
npm run coverage

# Run ESLint
npm run lint

# Generate documentation
npm run typedoc
```

## License

MIT © [SangHakLee](https://github.com/SangHakLee)
