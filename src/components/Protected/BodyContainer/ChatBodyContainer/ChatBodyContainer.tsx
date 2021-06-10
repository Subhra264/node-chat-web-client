import { useEffect, useRef, useState } from "react";
import ChannelList, { ChannelList as Channels } from "../ChannelList/ChannelList";
import GroupList, { Group } from "../GroupList/GroupList";
import './ChatBodyContainer.scss';
import { useParams } from "react-router";
import io, { Socket } from 'socket.io-client';
import Chat from "../Chat/Chat";
import MemberList from "../MemberList/MemberList";

interface URIParams {
    groupId: string;
    channelId: string;
}

const ChatBodyContainer: React.FC = (props): JSX.Element => {
    const [groups, setGroups] = useState<[Group]>();
    const [channels, setChannels] = useState<Channels>();
    const { groupId, channelId } = useParams<URIParams>();
    const socket = useRef<Socket>();

    useEffect(() => {
        fetch('/user/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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
        socket.current = io(`channels/${groupId}/${channelId}`, {
            transports: ['websocket']
        });

        return () => {
            socket.current?.off();
        }
    }, []);
    
    return (
        <div id='chat-body-container' >
            <GroupList groups={groups} />
            <ChannelList channels={channels} />
            <Chat />
            <MemberList />
        </div>
    );
};

export default ChatBodyContainer;