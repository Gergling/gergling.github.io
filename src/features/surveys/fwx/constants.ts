import { SelectOption } from "../../../common/types";
import { GetFWXAnswer } from "./types";

type BaseAnswerKey = 'no' | 'yes';

type ConfigAnswers = {
  heavy: BaseAnswerKey; // > 75% 1RM
  free: BaseAnswerKey | 'not-exist'; // Free space
  heavier: BaseAnswerKey; // Dumbbell in the space is heavier than yours
  distance: 'adjacent' | 'rack' | 'far'; // Nearest available rack space.
  blocking: ''; // There are people or other obstacles in the way.
  rules: BaseAnswerKey; // Are there rules against leaving weights on the floor.
  hanlon: 'plant' | 'studio'; // Other locations available.
  location: 'open' | 'correct' | 'floor' | 'near' | 'far' | 'stack'; // Where you put it back, including the correct location and the nearest available locations. Also, stack on top of existing dumbbells.
  // Also needs a location to put the dumbbell that was swapped out.
};

type QuestionKey = keyof ConfigAnswers;
type ConfigQuestionOptions<K extends QuestionKey = QuestionKey> = {
  [J in ConfigAnswers[K]]: string;
};
type ConfigQuestion = {
  name: string;
  title: string;
  enabled?: (get: GetFWXAnswer) => boolean;
  options?: Record<string, string> | SelectOption[];
};

const getBaseOptions = <
  K extends QuestionKey
>(extension: Partial<ConfigQuestionOptions<K>> = {}): ConfigQuestionOptions<K> => {
  return {
    no: 'No',
    yes: 'Yes',
    ...extension,
  } as ConfigQuestionOptions<K>;
};

const defaultEnabled = () => true;

// TODO: Unit test the config, since the types are going to be complicated.
const createConfig = (
  config: ConfigQuestion[]
): Required<ConfigQuestion>[] => {
  return config.map(({
    enabled = defaultEnabled,
    name,
    options,
    title,
  }) => {
    return {
      enabled,
      name,
      options: options ?? getBaseOptions(),
      title,
    };
  });
};

// Possibly we can calculate 0.61804697157 and then severity reductions can be stacked by using this as compound interest.
export const FWX_QUESTIONS_CONFIG = createConfig([
  {
    name: 'rules',
    title: 'Are there rules against leaving weights on the floor?',
    // enabled: (answers) => answers('free') === 'no',
    // Gym rules should go at the top and be saved, ideally.
  },
  {
    title: 'Do the dumbbells weigh more than 75% of your 1RM?',
    name: 'heavy',
    // Heavy weights should reduce the severity of crappy decisions.
  },
  {
    name: 'blocking',
    title: 'Is it busy or people are being so incosiderate that there are people or other obstacles between you and the rack?',
    options: {
      no: 'No',
      difficult: 'There are enough people wandering in front of me or random items liek dumbbels left on the floor that I will have to watch my footing, but I can see where I need to go.',
      blocked: 'I cannot even see where the weights need to be put back most of the time.',
    },
    // Difficulty seeing or accessing the rack reduces the severity.
  },
  {
    name: 'free',
    title: 'Is the correct dumbbell location on the rack free?',
    options: getBaseOptions({
      'not-exist': 'It does not exist',
    }),
    // If the correct dumbbell location is not free, severity is reduced.
    // Further reduced by non-existence.
  },
  // The target location is blocked by other dumbbells.
  {
    name: 'heavier',
    title: 'Are the blocking dumbbells on the rack heavier than your current dumbbells?',
    enabled: (answers) => answers('free') === 'no',
    // Heavier blocking dumbbells reduce severity
  },
  {
    name: 'distance',
    title: 'Where is the nearest available rack space?',
    options: {
      adjacent: 'Adjacent to the correct rack space',
      rack: 'On the same rack or nearby on an adjacent rack',
      far: 'On a rack that is at least within the same gym'
    },
    enabled: (answers) => answers('free') === 'no',
    // Adjacency affects nothing. Otherwise distance reduces severity.
  },
  {
    name: 'hanlon',
    title: 'Other locations available?',
    // Multiple choice, any combination reduces severity.
  },
  {
    name: 'location',
    title: 'Where do you put them back?',
    // TODO: Enable when there is enough information.
    // enabled: (answers) => answers('free') === 'no',
    // The correct placement
    // Where you put it back, including the correct location and the
    // nearest available locations. Also, stack on top of existing
    // dumbbells.
    options: [
      {
        // TODO: Enable when the location is available.
        value: 'correct',
        text: 'Where they go.',
      }, {
        value: 'open',
        text: 'The nearest open location on the rack',
      }, {
        // What does this mean if the gym rules involve not leaving them on the floor.
        value: 'floor',
        text: 'On the floor wherever you were training',
      }, {
        // Chaotic good-ish
        value: 'near',
        text: 'On the floor near the correct rack location',
      }, {
        // Chaotic evil
        value: 'far',
        text: 'As far away as possible, and in another room if available as an option',
      }, {
        // Lawful evil
        value: 'stack',
        text: 'Stack on top of dumbbells at the correct rack location',
      },
    ],
  },
]);
