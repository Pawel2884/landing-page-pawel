// Os czasu pochodzi w calosci z tools/build-timeline.mjs, ktory liczy ja
// z realnych dlugosci plikow lektora. Tutaj tylko typy i re-eksport.
import timeline from './timeline.json';

export type Vo = {file: string; from: number; dur: number};
export type Cap = {a: number; b: number; text: string; hi?: string};

export const VO: Vo[] = timeline.vo;
export const CAPS: Cap[] = timeline.caps as Cap[];
export const S = timeline.scenes as unknown as Record<string, [number, number]>;
