import { FilterNodeRoot, FilterNode } from "./use-filter-select-3-layers"

type Values = {
  [key: string]: Values
}

const _convert = (values: Values): FilterNode[] => {
  return Object.entries(values).filter(([key]) => key !== "").map(([key, value]) => {
    return {
      value: key,
      label: key,
      children: _convert(value)
    }
  })
}

export const jsonToFilterNode3Layers = (json: unknown): FilterNodeRoot => {
  const values = json as Values
  return {
    children: _convert(values)
  }
}
