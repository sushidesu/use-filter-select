import { FilterNodeRoot, FilterNode } from "./use-filter-select"

type Values = {
  [key: string]: Values
}

const _convert = (values: Values): FilterNode[] => {
  return Object.entries(values).map(([key, value]) => {
    return {
      value: key,
      label: key,
      children: _convert(value)
    }
  })
}

export const jsonToFilterNode = (json: unknown): FilterNodeRoot => {
  const values = json as Values
  return {
    children: _convert(values)
  }
}
