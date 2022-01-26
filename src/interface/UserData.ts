type Dimension = number | Record<string, number> // Takes an object with key of string
export interface UserData {
  shape: string
  dimension: Dimension
}
