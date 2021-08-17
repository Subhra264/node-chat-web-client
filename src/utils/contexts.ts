import React from "react";
import { Socket } from "socket.io-client";

export interface GroupContextValue {
    groupId: string;
    channelId: string;
}

export const SocketContext = React.createContext<Socket | null>(null);
export const GroupContext = React.createContext<GroupContextValue>({
    groupId: '',
    channelId: ''
});