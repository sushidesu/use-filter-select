# @sushidesu/use-filter-select

## Installation

for Yarn

```sh
yarn add @sushidesu/use-filter-select
```

for npm

```sh
npm install --save @sushidesu/use-filter-select
```

## Example

```tsx
import { useFilterSelect3Layers, jsonToFilterNode3Layers } from "@sushidesu/use-filter-select";
import data from "./data.json";

export const App = () => {
  // parse JSON
  const root = jsonToFilterNode3Layers(data);
  // use hook
  const [selects, values, setter] = useFilterSelect3Layers(
    root,
    // set default values (optional)
    {
      layer01: "sapporo",
      layer02: undefined,
      layer03: undefined,
    },
    // set first option (optional)
    {
      value: "",
      label: "Please select !!",
    }
  );

  console.log(values);

  return (
    <div>
      <div>
        {selects.map(({ options, ...props }, i) => (
          <select key={i} {...props}>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ))}
      </div>
      <button
        onClick={() => {
          setter.setterLayer02("asahikawa");
        }}
      >
        set City to asahikawa
      </button>
    </div>
  );
};
```
