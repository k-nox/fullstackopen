const x = 1
let y = 5

console.log('x, y', x, y)
y += 10
console.log('x, y', x, y)
y = 'sometext'
console.log('x, y', x, y)
// x = 4 // error

const t = [1, -1, 3]
t.push(5)
console.log('t.length', t.length)
console.log('t[1]', t[1])

t.forEach((value, index) => {
    console.log(`index ${index}: ${value}`)
})

const t2 = [1, -1, 3]
const t3 = t2.concat(5)
console.log('t2', t2)
console.log('t3', t3)

const a = [1, 2, 3]
const m1 = a.map(value => value * 2)
console.log('a', a)
console.log('m1', m1)

const m2 = a.map(value => '<li>' + value + '</li>')
console.log('m2', m2)

const b = [1, 2, 3, 4, 5]
const [first, second, ...rest] = b
console.log('first, second', first, second)
console.log('rest', rest)

const object1 = {
    name: 'Knox',
    age: 26,
    education: 'Bootcamp',
}

const object2 = {
    name: 'Full Stack web application development',
    level: 'intermediate studies',
    size: 5,
}

const object3 = {
    name: {
        fist: 'Knox',
        last: 'Lumos',
    },
    grades: [2, 3, 5, 3],
    department: 'Hard Knock Life',
}

console.log('object1.name', object1.name)
const fieldName = 'age'
console.log('object1[fieldName]', object1[fieldName])

object1.address = 'WA'
object1['secret number'] = 12341
console.log('object1', object1)

const sum = (p1, p2) => {
    console.log('p1', p1)
    console.log('p2', p2)
    return p1 + p2
}

const result = sum(1, 5)
console.log('result', result)

const square = p => {
    console.log('p', p)
    return p * p
}

const result2 = square(2)
console.log('result2', result2)

const square2 = p => p * p
console.log('square2(3)', square2(3))

const aSquared = a.map(p => p * p)
console.log('aSquared', aSquared)

function product(a, b) {
    return a * b
}

console.log('product(2, 6)', product(2, 6))

const average = function (a, b) {
    return (a + b) / 2
}
console.log('average(2, 5)', average(2, 5))