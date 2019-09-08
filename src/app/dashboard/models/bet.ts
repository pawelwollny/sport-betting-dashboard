import { Team } from './team';

export interface Bet {
  readonly id: number;
  readonly teams: readonly Team[];
  readonly draw: number;
}
