const generateRandomHexColor = () =>
  // eslint-disable-next-line unicorn/number-literal-case
  `#${Math.floor(Math.random() * 0xffffff).toString(16)}`

export const getRandomImage = () => {
  const randomColor = generateRandomHexColor()
  return `https://via.placeholder.com/500/${randomColor}`
}
