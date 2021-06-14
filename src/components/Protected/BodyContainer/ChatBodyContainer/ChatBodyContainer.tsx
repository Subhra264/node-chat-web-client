import { useEffect, useRef, useState } from "react";
import ChannelList, { ChannelList as Channels } from "../ChannelList/ChannelList";
import GroupList, { Group } from "../GroupList/GroupList";
import './ChatBodyContainer.scss';
import { useParams } from "react-router";
import io, { Socket } from 'socket.io-client';
import Chat from "../Chat/Chat";
import MemberList from "../MemberList/MemberList";
import { SocketContext } from "../../../../utils/contexts";

interface URIParams {
    groupId: string;
    channelId: string;
}

const ChatBodyContainer: React.FC = (props): JSX.Element => {
    const [groups, setGroups] = useState<[Group]>();
    const [channels, setChannels] = useState<Channels>();
    const { groupId, channelId } = useParams<URIParams>();
    const socketRef = useRef<Socket | null>(null);

    useEffect(() => {
        fetch('api/user/dashboard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer `
            },
            body: JSON.stringify({
                groupId,
                channelId
            })
        }).then((response) => {
            return response.json();
        }).then((result) => {
            if (result.type === 'error') {
                throw new Error(result.message);
            }
            
            setGroups(result.message.groups);
            setChannels(result.message.channels);
        }).catch((err: Error) => {
            console.log(err);
        })
    }, [groupId, channelId]);

    useEffect(() => {
        socketRef.current = io(`channels/${groupId}/${channelId}`, {
            transports: ['websocket']
        });

        return () => {
            socketRef.current?.off();
        }
    }, []);
    
    return (
        <div id='chat-body-container' >
            <SocketContext.Provider value={socketRef.current}>
                <GroupList groups={groups} />
                <ChannelList channels={channels} />
                <Chat />
                <MemberList />
            </SocketContext.Provider>
        </div>
    );
};

export default ChatBodyContainer;