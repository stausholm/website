export function random(c, a) { // returns random number between c and a
  return c + ~~(Math.random() * (a - c))
}