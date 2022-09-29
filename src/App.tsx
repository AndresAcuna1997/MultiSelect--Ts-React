import { useState } from "react";
import Select from "./components/Select";

import { SelectOptions } from "./interfaces/SelectOptions.interface";

const options: SelectOptions[] = [
  { label: 1, value: "First" },
  { label: 2, value: "Second" },
  { label: 3, value: "Third" },
];

function App() {
  const [value, setValue] = useState<SelectOptions | undefined>(options[0]);
  const [valueMultiple, setValueMultiple] = useState<SelectOptions[]>([
    options[0],
  ]);

  const onChangeSelect = (o: SelectOptions | undefined): void => {
    setValue(o);
  };

  return (
    <div className="App">
      <Select
        options={options}
        value={value}
        onChange={(o) => onChangeSelect(o)}
      />

      <Select
        multiple
        options={options}
        value={valueMultiple}
        onChange={(o) => setValueMultiple(o)}
      />
    </div>
  );
}

export default App;
