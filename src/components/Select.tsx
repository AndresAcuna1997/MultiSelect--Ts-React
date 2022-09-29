import styles from "../styles/select.module.css";

import { SelectOptions } from "../interfaces/SelectOptions.interface";
import { useState } from "react";

interface SingleSelectProps {
  multiple?: false;
  value?: SelectOptions;
  onChange: (value: SelectOptions | undefined) => void;
}

interface MultipleSelectProps {
  multiple: true;
  value: SelectOptions[];
  onChange: (value: SelectOptions[]) => void;
}

type SelectProps = {
  options: SelectOptions[];
} & (SingleSelectProps | MultipleSelectProps);

const Select = ({ multiple, value, onChange, options }: SelectProps) => {
  const [showOptions, setShowOptions] = useState<boolean>(false);

  const [highlighted, setHighlighted] = useState(0);

  const toogleMenu = (): void => setShowOptions(!showOptions);

  const selectOption = (option: SelectOptions): void => {
    if (multiple) {
      if (value.includes(option)) {
        onChange(value.filter((o) => o !== option));
      } else {
        onChange([...value, option]);
      }
    } else {
    }
  };

  const selectedOption = (option: SelectOptions): boolean => {
    return multiple ? value.includes(option) : option === value;
  };

  const clearOption = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    e.stopPropagation();
    multiple ? onChange([]) : onChange(undefined);
  };

  return (
    <div
      onClick={toogleMenu}
      onBlur={() => setShowOptions(false)}
      className={styles.container}
      tabIndex={0}
    >
      <span className={styles.value}>
        {multiple
          ? value.map((v, i) => (
              <button
                key={v.value}
                onClick={(e) => {
                  e.stopPropagation();
                  selectOption(v);
                }}
                className={styles["option-badge"]}
              >
                {v?.value}
                <span className={styles["remove-btn"]}>&times;</span>
              </button>
            ))
          : value?.value}
      </span>
      <button onClick={(e) => clearOption(e)} className={styles["clear-btn"]}>
        &times;
      </button>
      <div className={styles.divider}></div>
      <div className={styles.caret}></div>
      <ul className={`${styles.options} ${showOptions ? styles.show : ""}`}>
        {options.map((option, i) => (
          <li
            onClick={(e) => {
              e.stopPropagation();
              selectOption(option);
              setShowOptions(false);
            }}
            onMouseEnter={() => setHighlighted(i)}
            className={`
            ${styles.option} 
            ${selectedOption(option) ? styles.selected : ""} 
            ${i === highlighted ? styles.highlighted : ""}`}
            key={option.label}
          >
            {option.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Select;
