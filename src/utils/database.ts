import path from 'path'
import fs from 'fs'
import { UserData } from '../interface/UserData'

export function readFromDatabase(): any {
  try {
    const buffer = fs.readFileSync(
      path.join(__dirname, '..', '/database/data.json'),
      'utf8'
    )
    const parsedBuffer = JSON.parse(buffer)
    return parsedBuffer
  } catch {
    return []
  }
}

export function writeInToDatabase(data: UserData[]): void {
  return fs.writeFileSync(
    path.join(__dirname, '..', '/database/data.json'),
    JSON.stringify(data)
  )
}
