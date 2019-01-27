export default function random(to, from = 0) {
  return Math.floor(Math.random() * (to - from)) + from
}
