import { Response } from 'express'
import { UserData } from '../interface/UserData'
export const validateInput = async (res: Response, data: UserData) => {
  // Convert string input to lowercase

  const shape = data.shape.toLowerCase()
  const dimension = data.dimension

  const length = Object.keys(dimension).length

  let error = {}
  if (
    shape == null ||
    (shape != 'square' &&
      shape != 'circle' &&
      shape != 'rectangle' &&
      shape != 'triangle')
  ) {
    return res.status(400).json({ error: `${shape} is not a valid shape.` })
    // return res.status(statusCode).json({ message: err.message })
  }

  if (
    (shape == 'triangle' && (typeof dimension !== 'object' || length !== 3)) ||
    (shape == 'rectangle' && (typeof dimension !== 'object' || length !== 2))
  ) {
    // return res.status(statusCode).json({ message: err.message })
    return res
      .status(400)
      .json({ error: ` Invalid shape dimension of ${shape}.` })
  }
}
