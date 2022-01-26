import { UserData } from '../interface/UserData'

export function calculate(data: UserData) {
  const shape = data.shape.toLowerCase()
  let area = 0
  const dimension = data.dimension

  const num = +dimension

  // Square shape
  area = calculateShapes(shape, area, num, dimension)

  return { message: +area.toFixed(2) }
}
function calculateShapes(
  shape: string,
  area: number,
  num: number,
  dimension: number | Record<string, number>
) {
  if (shape === 'square') {
    area = num ** 2
  }

  // Circle shape
  if (shape == 'circle') {
    area = Math.PI * num ** 2
  }

  // Rectangle shape
  if (shape == 'rectangle') {
    const [a, b] = Object.values(dimension)
    area = a * b
  }

  //Triangle Shape
  if (shape == 'triangle') {
    const [a, b, c] = Object.values(dimension)
    const prerimeter = (a + b + c) / 2
    area = Math.sqrt(
      prerimeter * ((prerimeter - a) * (prerimeter - b) - (prerimeter - c))
    )
  }
  return area
}
