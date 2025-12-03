/**
 * In-memory storage for active rooms and their participants.
 * @type {Record<string, Record<string, IUser>>}
 */
export const rooms: Record<string, Record<string, IUser>> = {};

/**
 * In-memory storage for chat messages in each room.
 * @type {Record<string, IMessage[]>}
 */
export const chats: Record<string, IMessage[]> = {};

/**
 * Interface representing a user in a room.
 * @interface IUser
 */
export interface IUser {
    /** Unique peer ID for WebRTC connection */
    peerId: string;
    /** User's display name */
    userName: string;
}

/**
 * Interface for room parameters.
 * @interface IRoomParams
 */
export interface IRoomParams {
    /** Unique room ID */
    roomId: string;
    /** Unique peer ID */
    peerId: string;
}

/**
 * Interface for joining a room, extending room parameters.
 * @interface IJoinRoomParams
 * @extends IRoomParams
 */
export interface IJoinRoomParams extends IRoomParams {
    /** User's display name */
    userName: string;
}

/**
 * Interface for a chat message.
 * @interface IMessage
 */
export interface IMessage {
    /** Message content */
    content: string;
    /** Author of the message (optional) */
    author?: string;
    /** Timestamp of the message */
    timestamp: number;
}
