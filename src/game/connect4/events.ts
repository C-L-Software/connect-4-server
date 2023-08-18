import { type EmptyObject } from '../../utils/utils'
import { type BasicEventCallback } from '../../types/events'

export enum EventType {
  GAME_STATE = 'game_state',
  DROP_CHIP = 'drop_chip',
}

export interface DropChipEventRequest { column: number }
export type DropChipEventResponse = EmptyObject
export type DropChipEventCallback = BasicEventCallback
