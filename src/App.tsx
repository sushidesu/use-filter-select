import { useFilterSelect } from "./lib/use-filter-select"
import { jsonToFilterNode } from "./lib/json-to-filter-node"
import data from "./15niigat.json"

export const App = () => {
  const root = jsonToFilterNode(data)
  const [selects, values, setter] = useFilterSelect(root, {
    layer01: undefined,
    layer02: "新潟市北区",
    layer03: undefined,
  }, {
    value: "",
    label: "選択してね"
  })

  console.log(values)

  return (
    <div>
      <div>hello</div>
      <div>
        {selects.map(({ options, ...props }, i) => (
          <select key={i} {...props}>{
            options.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))
          }</select>
        ))}
      </div>
      <button onClick={() => {
        setter.setterLayer02("三条市")
      }}>set City to 三条市</button>
    </div>
  )
}
