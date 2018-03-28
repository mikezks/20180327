export const INCREASE_BY = '[App] Increase by';

export class IncreaseByAction {
  readonly type = INCREASE_BY;
  constructor (readonly amount: number) { }
}

export type AppAction = IncreaseByAction;

