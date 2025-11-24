export type SvgPosition = {
  x?: number;
  y?: number;
};

type SvgDefs<T extends string> = {
  [K in T]: string;
};

export type SvgComponentProps<T extends string | undefined = undefined> = Partial<SvgPosition> & {
  color?: string;
} & ([T] extends [string]
  ? { defs: SvgDefs<T> }
  : { defs?: never; });

// // Where
// type X = SvgComponentProps<'x' | 'y'>;
// type Y = X['defs'];
// // is of this type:
// // type Y = {
// //     x: string;
// // } | {
// //     y: string;
// // }

// // I want:
// // type Y = {
// //     x: string;
// //     y: string;
// // }
