import { Dispatch, useCallback } from "react";
import type { OptionsObject, RatioForm, Separator } from "../types";

interface RadioGroupProps<T extends RatioForm | Separator> {
  title: string;
  values: OptionsObject<T>[];
  valueState: T;
  setValueState: Dispatch<T>;
}

export default function RadioGroup<T extends RatioForm | Separator>({
  values,
  valueState,
  setValueState,
  title,
}: RadioGroupProps<T>) {
  const handleChange = useCallback(
    (text: T) => setValueState(text),
    [setValueState],
  );

  return (
    <fieldset className="my-6 grid grid-cols-1 gap-4">
      <legend className="sr-only">{title}</legend>
      {values.map((value) => {
        const isChecked = valueState === value.title;
        const inputId = `${title}_${value.title}`;
        const textColor = isChecked ? "text-white" : "text-gray-900";

        return (
          <div key={value.title} className="radio-option">
            <input
              type="radio"
              name={title}
              value={value.title}
              id={inputId}
              className="sr-only"
              checked={isChecked}
              onChange={() => handleChange(value.title)}
            />
            <label
              htmlFor={inputId}
              className={`radio-group-label ${isChecked ? "bg-black dark:bg-blue-violet-600" : "border border-solid border-black dark:border-none dark:bg-white"}`}
            >
              <p className={textColor}>{value.title}</p>

              <p className={`${textColor} code-font text-xs`}>
                {value.subtitle}
              </p>
            </label>
          </div>
        );
      })}
    </fieldset>
  );
}
