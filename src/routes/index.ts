import { Router, Request, Response } from 'express'
import { calculate } from '../constants/calculate'
import { UserData } from '../interface/UserData'
// import { validateInput } from '../utils/validator'
import { readFromDatabase, writeInToDatabase } from '../utils/database'

const router = Router()

const readFileData = readFromDatabase()
router.post('/calculate', async (req: Request, res: Response) => {
  const { shape: shapeInput, dimension }: UserData = req.body
  const shape = shapeInput.toLowerCase()
  const length = Object.keys(dimension).length

  if (
    shape == null ||
    (shape != 'square' &&
      shape != 'circle' &&
      shape != 'rectangle' &&
      shape != 'triangle')
  ) {
    return res.status(400).json({ error: `${shape} is not a valid shape.` })
  }

  if (
    (shape == 'triangle' && (typeof dimension !== 'object' || length !== 3)) ||
    (shape == 'rectangle' && (typeof dimension !== 'object' || length !== 2))
  ) {
    return res
      .status(400)
      .json({ error: ` Invalid shape dimension of ${shape}.` })
  }

  // Perform Calculation.
  const area = calculate({ shape, dimension })

  //Create an Id
  let id = 0
  if (readFileData.length == 0) {
    id = 1
  } else {
    id = readFileData[readFileData.length - 1].id + 1
  }

  const dataToWrite = {
    id,
    area: area.message,
    ...{ shape, dimension },
  }

  if (readFileData.length == 0) {
    writeInToDatabase([dataToWrite])
  } else {
    readFileData.push(dataToWrite)
    writeInToDatabase(readFileData)
  }

  return res.status(200).json({ msg: dataToWrite })
})

/* GET all calculations */
router.get('/fetchRecords', (req: Request, res: Response) => {
  res.json(readFromDatabase())
})

export { router }

/* 
export const handleResSuccess = (
  res: Response,
  message: string,
  data: any,
  statusCode: number
) => {
  return res.status(statusCode).json({
    message,
    data,
  })
}



export const handleResError = (res: Response, err: any, statusCode: number) => {
  return res.status(statusCode).json({
    message: err.message,
  })
}
 */
