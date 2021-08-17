import { useEffect, useRef, useState } from "react";
import ChannelList, { ChannelList as Channels } from "../ChannelList/ChannelList";
import GroupList, { Group } from "../GroupList/GroupList";
import './ChatBodyContainer.scss';
import { useParams } from "react-router";
import io, { Socket } from 'socket.io-client';
import Chat from "../Chat/Chat";
import MemberList from "../MemberList/MemberList";
import { GroupContext, SocketContext } from "../../../../utils/contexts";
import { getRequest } from "../../../../utils/fetch-requests";
import useUserSelector from "../../../../hooks/useUserSelector";

interface URIParams {
    groupId: string;
    channelId: string;
}

const ChatBodyContainer: React.FC = (props): JSX.Element => {
    // const [groups, setGroups] = useState<[Group]>();
    const [channels, setChannels] = useState<Channels>();
    const { groupId, channelId } = useParams<URIParams>();
    const socketRef = useRef<Socket | null>(null);
    const { accessToken } = useUserSelector();

    // useEffect(() => {
    //     // fetch(`api/user/dashboard/${groupId}/${channelId}`, {
    //     //     method: 'GET',
    //     //     headers: {
    //     //         'Content-Type': 'application/json',
    //     //         'Authorization': `Bearer `
    //     //     }
    //     // }).then((response) => {
    //     //     return response.json();
    //     // }).then((result) => {
    //     //     if (result.type === 'error') {
    //     //         throw new Error(result.message);
    //     //     }
            
    //     //     setGroups(result.message.groups);
    //     //     setChannels(result.message.channels);
    //     // }).catch((err: Error) => {
    //     //     console.log(err);
    //     // })

    //     const successHandler = (result: any) => {
    //         setGroups(result.groups);
    //         setChannels(result.channels);
    //     };

    //     const errorHandler = (err: Error) => {
    //         console.log('Error fetching dashboard', err.message);
    //     };

    //     const accessToken_ = accessToken? accessToken : '';
    //     getRequest(
    //         `api/user/dashboard/${groupId}/${channelId}`,
    //         accessToken_,
    //         successHandler,
    //         errorHandler
    //     );

    // }, [groupId, channelId]);

    useEffect(() => {
        socketRef.current?.off();
        socketRef.current = io(`/channels/${groupId}/${channelId}`, {
            transports: ['websocket']
        });

        return () => {
            socketRef.current?.off();
        }
    }, [channelId, groupId]);
    
    return (
        <div id='chat-body-container' >
            <SocketContext.Provider value={socketRef.current}>
                <GroupContext.Provider value={{ groupId, channelId }}>
                    <GroupList />
                    <ChannelList channels={channels} />
                    <Chat />
                    <MemberList />
                </GroupContext.Provider>
            </SocketContext.Provider>
        </div>
    );
};

export default ChatBodyContainer;