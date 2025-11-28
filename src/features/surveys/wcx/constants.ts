import { WCXAnswers, WCXConfigQuestion, WCXQuestionKey } from "./types";

type OptionalProps<
  T extends {},
  U extends keyof T
> = Partial<Pick<T, U>> & Omit<T, U>;
type ConfigQuestionsByName = { [K in WCXQuestionKey]: WCXConfigQuestion; };

const defaultEnabled = () => true;

const createConfig = (
  questions: Omit<OptionalProps<
    WCXConfigQuestion,
    'enabled' | 'weight'
  >, 'scored'>[],
) => {
  const {
    byName,
    list,
  } = questions.reduce(({
    byName,
    list,
  }, configQuestion) => {
    const scoredOptions = configQuestion.options.filter(({ score }) => score !== undefined);
    const scored = scoredOptions.length === configQuestion.options.length;
    
    if (
      scoredOptions.length === 0 && scored
    ) throw new Error(`Config error: Some options missing scores for question ${configQuestion.name}`);

    const enabled = configQuestion.enabled ?? defaultEnabled;
    // If the config doesn't provide a weight, but provides option scores, the weight is 1.
    const weight = configQuestion.weight ?? (scored ? 1 : 0);
    const question: WCXConfigQuestion = {
      ...configQuestion,
      enabled,
      scored,
      weight,
    };
    return {
      byName: {
        ...byName,
        [question.name]: {
          ...question,
        },
      },
      list: [
        ...list,
        question,
      ],
    };
  }, {
    byName: {} as ConfigQuestionsByName,
    list: [],
  } as {
    byName: ConfigQuestionsByName;
    list: WCXConfigQuestion[];
  });

  const getConfigQuestionByName = (
    name: WCXQuestionKey
  ): WCXConfigQuestion => byName[name];
  const getConfigQuestions = (): WCXConfigQuestion[] => list;
  const getInitialAnswers = () => list.reduce<WCXAnswers>((answers, { name }) => {
    return {
      ...answers,
      [name]: undefined,
    };
  }, {} as WCXAnswers)

  return {
    getInitialAnswers,
    getConfigQuestionByName,
    getConfigQuestions,
  };
};

export const WCX_QUESTION_CONFIG = createConfig([
  {
    name: 'stall',
    title: 'Did you use a stall?',
    options: [
      { value: 'no', text: 'No', next: 'urinal' },
      { value: 'yes', text: 'Yes', next: 'toiletPaper' },
    ],
  },
  {
    name: 'toiletPaper',
    enabled: ({ stall }: WCXAnswers) => stall === 'yes',
    title: 'Was there toilet paper?',
    options: [
      { value: 'yes', text: 'Yes of course. Are we savages?', next: 'smell', score: 1 },
      { value: 'no', text: 'No, the crapper maintenance was crapper than usual.', next: 'smell', score: 0 },
    ],
    weight: 2,
  },
  {
    name: 'smell',
    title: 'How was the smell?',
    enabled: ({ stall }: WCXAnswers) => stall === 'yes',
    weight: 1,
    options: [
      {
        next: 'flush',
        score: 1,
        text: 'Actually pleasant or even likeable… yes I\'m as surprised as you are.',
        value: 'pleasant',
      },
      {
        next: 'flush',
        score: 0.3,
        text: 'I have questions about the diet of the last person who just used it, and I don\'t want answers.',
        value: 'questions',
      },
      {
        next: 'flush',
        score: 0.9,
        text: 'There was no smell… at least before I used the toilet.',
        value: 'no-smell',
      },
      {
        next: 'flush',
        score: 0.5,
        text: 'The smell was… tolerable.',
        value: 'smell',
      },
      {
        next: 'flush',
        score: 0,
        text: 'The smell caused one or more of my internal organs to demand motivation.',
        value: 'organs',
      }
    ],
  },
  {
    name: 'flush',
    title: 'Did the flush work?',
    enabled: ({ stall }: WCXAnswers) => stall === 'yes',
    options: [
      { value: 'yes', next: 'lock', text: 'Yes, of course. Are we savages?', score: 1 },
      { value: 'no', next: 'lock', text: 'No, the maintenance doesn\'t seem to be flush.', score: 0 },
    ],
  },
  {
    name: 'lock',
    title: 'Did the lock work?',
    enabled: ({ stall }: WCXAnswers) => stall === 'yes',
    weight: 2,
    options: [
      {
        next: 'urinal',
        score: 1,
        text: 'Yes, of course. Are we sausages?',
        value: 'yes',
      },
      {
        next: 'urinal',
        score: 0,
        text: 'No, I just have an open-door policy. Of course it didn\'t bloody work!',
        value: 'no',
      },
    ],
  },
  {
    name: 'urinal',
    title: 'Did you use a urinal?',
    options: [
      {
        next: 'modesty',
        text: 'Yes',
        value: 'yes',
      },
      {
        next: 'taps',
        text: 'No',
        value: 'no',
      },
    ],
  },
  {
    name: 'modesty',
    title: 'Was the urinal equipped with a modesty screen or divider?',
    enabled: ({ urinal }: WCXAnswers) => urinal === 'yes',
    weight: 1,
    options: [
      {
        next: 'taps',
        score: 1,
        text: 'Yes, the awkwardness was at the bare minimum in spite of the number of people present and adjacent.',
        value: 'yes',
      },
      {
        next: 'taps',
        score: 0,
        text: 'No, the person(s) on either side could see everything. Everything.',
        value: 'no',
      },
      {
        next: 'taps',
        score: 0.5,
        text: 'I was too busy to notice because I was "focusing" If You Know What I Mean.',
        value: 'idk',
      },
    ],
  },
  {
    name: 'taps',
    title: 'Did the taps work?',
    weight: 2,
    options: [
      {
        next: 'dryHands',
        score: 1,
        text: 'Water output matched expectations when operated.',
        value: 'yes',
      },
      {
        next: 'dryHands',
        score: 0,
        text: 'No, and there was no warning.',
        value: 'unexpected',
      },
      {
        next: 'dryHands',
        score: 0.4,
        text: 'No, but I was told they wouldn\'t by a sign or staff member.',
        value: 'staff',
      },
      {
        next: 'dryHands',
        score: 0.2,
        text: 'No. I realised I was informed but not intelligibly.',
        value: 'unintelligible',
      },
      {
        next: 'dryHands',
        score: 0.6,
        text: 'I was eventually able to configure the taps correctly in order to obtain the desired output.',
        value: 'configured',
      },
    ],
  },
  {
    name: 'dryHands',
    title: 'How did you dry your hands?',
    weight: 1.5,
    options: [
      {
        next: 'done',
        score: 0.2,
        text: 'All the drying devices were in use, so I used my trousers.',
        value: 'all',
      },
      {
        next: 'done',
        score: 0,
        text: 'None of the drying instrumentation worked or was out of towels, so I used my trousers.',
        value: 'none',
      },
      {
        next: 'done',
        score: 0.6,
        text: 'It had those dryers which were eventually possible to configure effectively if you held your hands under it within a distance range to the closest micron. I used my trousers anyway.',
        value: 'eventually',
      },
      {
        next: 'aesthetic',
        score: 1,
        text: 'By using the dryer or paper towels effectively because we don\'t live in caves anymore. I wore my trousers.',
        value: 'effectively',
      }
    ],
  },
  {
    name: 'aesthetic',
    enabled: (answers: WCXAnswers) => {
      if (answers.stall === 'yes') {        
        if (answers.toiletPaper !== 'yes') return false;
        if (answers.smell !== 'pleasant') return false;
        if (answers.flush !== 'yes') return false;
        if (answers.lock !== 'yes') return false;
      }
      if (answers.urinal === 'yes') {
        if (answers.modesty !== 'yes') return false;
      }
      if (answers.taps !== 'yes') return false;
      if (answers.dryHands !== 'effectively') return false;
      return true;
    },
    title: 'If all good, how was the aesthetic?',
    weight: 1,
    options: [
      {
        next: 'done',
        score: 0.5,
        text: 'It was ostensibly clean and I didn\'t investigate in more detail.',
        value: 'clean',
      },
      {
        next: 'done',
        score: 1,
        text: 'It was well decorated (and not by me, either).',
        value: 'decorating',
      },
      {
        next: 'done',
        score: 0,
        text: 'Disregarding my own dietary habits (no matter how regrettable) the smell was not more than or equal to ideal.',
        value: 'disregarding',
      },
    ],
  },
]);

export const WCX_STARTING_QUESTION: WCXQuestionKey = 'stall';

// export const WCX_ANSWER_TEMPLATE = Object.entries(WCX_QUESTIONS).reduce<WCXAnswers>((answers, [key]) => {
//   const questionKey = key as WCXQuestionKey;
//   return {
//     ...answers,
//     [questionKey]: undefined,
//   };
// }, {} as WCXAnswers);
