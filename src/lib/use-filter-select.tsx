import React, { useState } from "react"

type FilterNodeRoot = {
  children: FilterNode[]
}

type FilterNode = {
  label: string
  value: string
  children: FilterNode[]
}

type OptionItem = {
  label: string
  value: string
}

type SelectProps = {
  value: string | undefined
  onChange: React.ChangeEventHandler<HTMLSelectElement>
  options: OptionItem[]
}

export const useFilterSelect = (tree: FilterNodeRoot): [SelectProps[], {
  layer01: OptionItem | undefined,
  layer02: OptionItem | undefined,
  layer03: OptionItem | undefined
}] => {
  const layer01_default = tree.children[0]
  const layer02_default = layer01_default?.children[0]
  const layer03_default = layer02_default?.children[0]

  const [layer01, setLayer01] = useState<string | undefined>(layer01_default?.value)
  const [layer02, setLayer02] = useState<string | undefined>(layer02_default?.value)
  const [layer03, setLayer03] = useState<string | undefined>(layer03_default?.value)

  const l1 = tree.children.find((node) => node.value === layer01)
  const l2 = l1?.children.find((node) => node.value === layer02)
  const l3 = l2?.children.find((node) => node.value === layer03)

  return [
  [
    {
      options: tree.children.map(node => _convert(node)),
      value: layer01,
      onChange: (e) => {
        setLayer01(() => {
          const next = e.target.value
          const nextl1 = tree.children.find((node) => node.value === next)
          const nextl1_default = nextl1?.children[0]
          const nextl2 = nextl1?.children.find((node) => node.value === nextl1_default?.value)
          const nextl2_default = nextl2?.children[0]
          setLayer02(nextl1_default?.value)
          setLayer03(nextl2_default?.value)
          return next
        })
      }
    },
    {
      options: l1?.children.map((node) => _convert(node)) ?? [],
      value: layer02,
      onChange: (e) => {
        const next = e.target.value
        setLayer02(next)
        const nextl2 = l1?.children.find((node) => node.value === next)
        const nextl2_default = nextl2?.children[0]
        setLayer03(nextl2_default?.value)
      }
    },
    {
      options: l2?.children.map((node) => _convert(node)) ?? [],
      value: layer03,
      onChange: (e) => {
        setLayer03(e.target.value)
      }
    }
  ],
  {
    layer01: l1,
    layer02: l2,
    layer03: l3
  }]
}

const _convert = (node: FilterNode): OptionItem => {
  return {
    value: node.value,
    label: node.label
  }
}
