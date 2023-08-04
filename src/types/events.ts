export type EventCallback = (success: boolean, response: string) => void;

export class NewGameEvent {
    public static readonly NAME = 'new_game'
}

export class JoinGameEvent {
    public static readonly NAME = 'join_game'

    roomCode: string

    constructor(roomCode: string) {
        this.roomCode = roomCode
    }
}

export class LeaveGameEvent {
    public static readonly NAME = 'leave_game'

    roomCode: string

    constructor(roomCode: string) {
        this.roomCode = roomCode
    }
}
