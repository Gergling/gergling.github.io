import { FormControlLabel, Radio, RadioGroup as BaseRadioGroup } from "@mui/material";
import { RadioQuestionProps } from "../types";

export const RadioGroup = <T,>({
  options,
  selectedAnswer,
  setSelectedAnswer,
}: RadioQuestionProps<T>) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value as T);
  };
  return (
    <BaseRadioGroup
      aria-labelledby="radio-buttons-group-label"
      name="radio-buttons-group"
      value={selectedAnswer || ''}
      onChange={handleChange}
    >
      {
        options.map((option, index) => (
          <FormControlLabel key={index} control={<Radio />} {...option} />
        ))
      }
    </BaseRadioGroup>
  )
};
