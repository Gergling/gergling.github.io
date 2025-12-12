type Key = 'heavy' | 'free' | 'heavier';

export type Answer = {
  [K in Key]: string | undefined;
};

export type GetFWXAnswer = (questionKey: string) => string | undefined;
