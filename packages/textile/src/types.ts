
export interface RmrkAction {
  process(): Promise<RMRK>
  processAndSave(): Promise<RMRK>
}

export enum RmrkInteraction {
  MINT = 'MINT',
  MINTNFT = 'MINTNFT',
  SEND = 'SEND'
}

export interface RMRK {
  interaction: RmrkInteraction;
  view: Object;
}

