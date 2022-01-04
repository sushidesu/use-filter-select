import React, { useState } from "react"

export type FilterNodeRoot = {
  children: FilterNode[]
}

export type FilterNode = {
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

export const useFilterSelect = (tree: FilterNodeRoot, defaultOption: OptionItem = {
  label: "選択してください",
  value: ""
}): [[SelectProps, SelectProps, SelectProps], {
  layer01: OptionItem | undefined,
  layer02: OptionItem | undefined,
  layer03: OptionItem | undefined
}] => {
  const layer01_default = tree.children[0]

  const [layer01, setLayer01] = useState<string | undefined>(layer01_default?.value)
  const [layer02, setLayer02] = useState<string | undefined>(undefined)
  const [layer03, setLayer03] = useState<string | undefined>(undefined)

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
          setLayer02(undefined)
          setLayer03(undefined)
          return next
        })
      }
    },
    {
      options: [defaultOption].concat(l1?.children.map((node) => _convert(node)) ?? []),
      value: layer02,
      onChange: (e) => {
        setLayer02(() => {
          const next = e.target.value
          setLayer03(undefined)
          return next
        })
      }
    },
    {
      options: [defaultOption].concat(l2?.children.map((node) => _convert(node)) ?? []),
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
