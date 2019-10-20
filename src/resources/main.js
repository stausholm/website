import "./main.scss";

// babel/preset-env is used to convert ES6 syntax to ES5. 
// If new ES6 library functions, such as string.includes is needed, install the individual polyfill or use @babel/polyfill (if using babel < v7.4) https://babeljs.io/docs/en/next/babel-polyfill.html

console.log('nice')
const set = new Set([1, 2, 3]);
[1, 2, 3].includes(2);

const x = "123";

const hasVal = x.includes('4')
console.log(hasVal)
const test = `this is ${x} test`

const arrow = () => {
  return 'this is arrow func'
}

const obj1 = {x} // this is a comment

const obj2 = {...obj1}

