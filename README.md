# cidr-overlapped

[![npm version](https://badge.fury.io/js/cidr-overlapped.svg)](https://badge.fury.io/js/cidr-overlapped)


[![NPM](https://nodei.co/npm/cidr-overlapped.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/cidr-overlapped/)


# Node.js
## Install
```bash
$ npm i cidr-overlapped
```
```javascript
const cidrOverlapped = require('cidr-overlapped')
```

## Example
```javascript
cidrOverlapped(['172.22.2.0/24'], '172.22.2.0/24') // true

cidrOverlapped(['172.22.2.0/24'], '172.22.3.0/24') // false
```


# Browser

## Example
```html
<script src="cidrOverlapped.js"></script>
<script>
    console.log(cidrOverlapped(['172.22.2.0/24'], '172.22.2.0/24')) // true
</script>
```

# cidrOverlapped
cidrOverlapped(subnets, subnet)
- `subnets`: List of existing subnets
- `subnet`: Subnet to check for overlap