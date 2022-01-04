import { useFilterSelect } from "./lib/use-filter-select"

export const App = () => {
  const [selects, values] = useFilterSelect({
    children: [
      {
        label: "札幌市",
        value: "sapporo",
        children: [
          {
            label: "北区",
            value: "kitaku",
            children: []
          },
          {
            label: "南区",
            value: "minamiku",
            children: []
          },
          {
            label: "東区",
            value: "higashiku",
            children: []
          }
        ]
      },
      {
        label: "小樽市",
        value: "otarushi",
        children: [
          {
            label: "銭函",
            value: "zenibako",
            children: []
          },
          {
            label: "オタモイ",
            value: "otamoi",
            children: []
          }
        ]
      }
    ]
  })

  console.log(values)

  return (
    <div>
      <div>hello</div>
      {selects.map(({ options, ...props }, i) => (
        <select key={i} {...props}>{
          options.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))
        }</select>
      ))}
    </div>
  )
}
