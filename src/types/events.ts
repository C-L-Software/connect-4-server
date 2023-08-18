import { type EmptyObject } from '../utils/utils'

export enum EventType {
    NEW_GAME = 'new_game',
    JOIN_GAME = 'join_game',
    START_GAME = 'start_game',
    PLAYER_JOINED = 'player_joined'
}

export type BasicEventCallback = (error: Error | null) => void

export type NewGameEventRequest = EmptyObject
export interface NewGameEventResponse { joinCode: string }
export type NewGameEventCallback = (error: Error | null, response: NewGameEventResponse | null) => void

export interface JoinGameEventRequest { joinCode: string }
export type JoinGameEventResponse = EmptyObject
export type JoinGameEventCallback = BasicEventCallback

export type StartGameEventRequest = EmptyObject
export type StartGameEventResponse = EmptyObject
export type StartGameEventCallback = BasicEventCallback
