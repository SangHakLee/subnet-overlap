# subnet-overlap

[![npm version](https://badge.fury.io/js/subnet-overlap.svg)](https://badge.fury.io/js/subnet-overlap)


[![NPM](https://nodei.co/npm/subnet-overlap.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/subnet-overlap/)


# Node.js
## Install
```bash
$ npm i subnet-overlap
```
```javascript
const subnetOverlap = require('subnet-overlap')
```

## Example
```javascript
subnetOverlap(['172.22.2.0/24'], '172.22.2.0/24') // true

subnetOverlap(['172.22.2.0/24'], '172.22.3.0/24') // false
```


# Browser

## Example
```html
<script src="subnetOverlap.js"></script>
<script>
    console.log(subnetOverlap(['172.22.2.0/24'], '172.22.2.0/24')) // true
</script>
```

# subnetOverlap
subnetOverlap(subnets, subnet)
- `subnets`: (**Array**) List of existing subnets
- `subnet`: (**String**) Subnet to check for overlap