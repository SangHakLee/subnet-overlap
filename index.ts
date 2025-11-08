// Re-export as named export for npm package users
import subnetOverlap from './src/subnet-overlap'
export { subnetOverlap }
export default subnetOverlap

// CommonJS compatibility
module.exports = subnetOverlap
module.exports.subnetOverlap = subnetOverlap
module.exports.default = subnetOverlap
