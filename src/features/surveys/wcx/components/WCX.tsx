import styled from '@emotion/styled';
import { Button, FormControl, FormLabel } from '@mui/material';
import { Pane } from '@gergling/ui-components';
import { interpolate, interpolateHue } from '../../../../common/utilities';
import { RadioGroup } from '../../common/components/RadioGroup';
import { useWCXSurvey } from '../hooks/use-survey';
import { WCXQuestion, WCXQuestionKey } from '../types';
import { useCallback, useMemo } from 'react';
import { RadioQuestionProps } from '../../common/types';


const StyledChip = styled.span<{ color: string; }>`
  background-color: ${({ color }) => color};
  color: ${({ theme }) => theme.colors.primary.on};
`;

const BackgroundColourChip = ({
  value,
}: {
  value: number;
}) => {
  const {
    color,
    text,
  } = useMemo(() => {
    const text = Math.round(interpolate(value, 0, 1, 0, 100));
    const hue = interpolateHue(value, 0, 1);
    const color = `hsl(${hue}, 100%, 30%)`;
    return {
      color,
      text,
    };
  }, [value]);
  return <StyledChip color={color}>{text}%</StyledChip>;
};

const Question = ({
  answer,
  name,
  setAnswer,
  title,
  ...question
}: WCXQuestion & {
  setAnswer: (questionKey: WCXQuestionKey, answer: string) => void;
}) => {
  const {
    options,
    specialValues,
  } = useMemo(() => {
    const options: RadioQuestionProps<string>['options'] = [];
    const specialValues: string[] = [];

    question.options.forEach(({ text, value }, idx) => {
      options.push({
        label: text,
        value: value || idx.toString(),
      });

      if (!value) {
        specialValues.push(idx.toString());
      }
    });

    return {
      options,
      specialValues,
    };
  }, [question.options]);

  const handleAnswerSelection = useCallback((selectedAnswer: string) => {
    setAnswer(name, selectedAnswer);
  }, [name, setAnswer, specialValues]);

  if (!question.enabled) return null;

  return <div>
    <FormControl>
      <FormLabel id="radio-buttons-group-label">
        {title}
      </FormLabel>
      <RadioGroup
        options={options}
        selectedAnswer={answer}
        setSelectedAnswer={handleAnswerSelection}
      />
    </FormControl>
  </div>;
};

export const WCXSurvey = () => {
  const {
    canSubmit,
    questions,
    scores: { data, quality },
    selectAnswer,
    setSubmitted,
    submitted,
  } = useWCXSurvey();

  const handleSubmit = () => setSubmitted(true);

  return <Pane>
    {submitted
      ? <>
        You rated this toilet: <BackgroundColourChip value={quality} />.
        The data quality rating is <BackgroundColourChip value={data} />.
      </>
      : <>
        {questions.map((props) => <Question key={props.name} {...props} setAnswer={selectAnswer} />)}
        <Button onClick={handleSubmit} disabled={!canSubmit}>Submit</Button>
      </>
    }
  </Pane>;
};
