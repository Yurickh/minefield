import random from './random'

export default function randomUntil(forbidden) {
  return (from, to) => {
    let rand

    do {
      rand = random(from, to)
    } while (forbidden.includes(rand))

    return rand
  }
}
