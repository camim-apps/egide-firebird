const { isEqualWith } = require('lodash')

const a = { ID: 10, NAME: 'robson', AGE: 46 }
const b = { id: 10, name: 'robson', age: 47 }

console.log(isEqualWith(a, b, (a, b) => a.ID === b.id && a.NAME === b.name && a.AGE === b.age))
