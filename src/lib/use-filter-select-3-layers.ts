import React, { useCallback, useState } from "react"

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

type SelectSetter = (value: string | undefined) => void

export const useFilterSelect3Layers = (
  tree: FilterNodeRoot,
  defaultValue?: {
    layer01: string | undefined
    layer02: string | undefined
    layer03: string | undefined
  },
  defaultOption: OptionItem = {
    label: "Please select",
    value: "",
  }
): [
  [SelectProps, SelectProps, SelectProps],
  {
    layer01: OptionItem | undefined
    layer02: OptionItem | undefined
    layer03: OptionItem | undefined
  },
  {
    setterLayer01: SelectSetter
    setterLayer02: SelectSetter
    setterLayer03: SelectSetter
  }
] => {
  const layer01_default = tree.children[0]

  const [layer01, setLayer01] = useState<string | undefined>(
    defaultValue?.layer01 ?? layer01_default?.value
  )
  const [layer02, setLayer02] = useState<string | undefined>(
    defaultValue?.layer02
  )
  const [layer03, setLayer03] = useState<string | undefined>(
    defaultValue?.layer03
  )

  const l1 = tree.children.find((node) => node.value === layer01)
  const l2 = l1?.children.find((node) => node.value === layer02)
  const l3 = l2?.children.find((node) => node.value === layer03)

  if (
    defaultValue?.layer01 !== undefined &&
    tree.children.findIndex((node) => node.value === defaultValue.layer01) ===
      -1
  ) {
    throw new Error(`layer01 > ${defaultValue.layer01} is not found`)
  }
  if (
    defaultValue?.layer02 !== undefined &&
    (!l1 ||
      l1.children.findIndex((node) => node.value === defaultValue.layer02) ===
        -1)
  ) {
    throw new Error(`layer02 > ${defaultValue.layer02} is not found`)
  }
  if (
    defaultValue?.layer03 !== undefined &&
    (!l2 ||
      l2.children.findIndex((node) => node.value === defaultValue.layer03) ===
        -1)
  ) {
    throw new Error(`layer03 > ${defaultValue.layer03} is not found`)
  }

  const handleChangeLayer03 = useCallback((value: string | undefined) => {
    setLayer03(value)
  }, [])
  const handleChangeLayer02 = useCallback((value: string | undefined) => {
    setLayer03(undefined)
    setLayer02(value)
  }, [])
  const handleChangeLayer01 = useCallback((value: string | undefined) => {
    setLayer03(undefined)
    setLayer02(undefined)
    setLayer01(value)
  }, [])

  return [
    [
      {
        options: convertOptions(tree, defaultOption),
        value: layer01,
        onChange: (e) => {
          handleChangeLayer01(e.target.value)
        },
      },
      {
        options: convertOptions(l1, defaultOption),
        value: layer02,
        onChange: (e) => {
          handleChangeLayer02(e.target.value)
        },
      },
      {
        options: convertOptions(l2, defaultOption),
        value: layer03,
        onChange: (e) => {
          handleChangeLayer03(e.target.value)
        },
      },
    ],
    {
      layer01: l1,
      layer02: l2,
      layer03: l3,
    },
    {
      setterLayer01: handleChangeLayer01,
      setterLayer02: handleChangeLayer02,
      setterLayer03: handleChangeLayer03,
    },
  ]
}

const convertOptions = (
  parent: FilterNodeRoot | FilterNode | undefined,
  defaultOption: OptionItem
): OptionItem[] => {
  if (!parent) {
    return []
  } else if (parent.children.length <= 1) {
    return parent.children.map((node) => _convert(node))
  } else {
    return [defaultOption].concat(parent.children.map((node) => _convert(node)))
  }
}

const _convert = (node: FilterNode): OptionItem => {
  return {
    value: node.value,
    label: node.label,
  }
}
