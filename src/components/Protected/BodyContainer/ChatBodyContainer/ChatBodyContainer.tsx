import { useEffect, useRef } from "react";
import GroupList from "../GroupList/GroupList";
import './ChatBodyContainer.scss';
import { useParams } from "react-router";
import io, { Socket } from 'socket.io-client';
import { SocketContext } from "../../../../utils/contexts";
import useUserSelector from "../../../../hooks/useUserSelector";
import { Route } from "react-router-dom";
import Profile from "../Profile/Profile";
import Group from "../Group/Group";

const ChatBodyContainer: React.FC = (props): JSX.Element => {
    // const [groups, setGroups] = useState<[Group]>();
    const socketRef = useRef<Socket | null>(null);
    const { accessToken } = useUserSelector();

    // useEffect(() => {
    //     socketRef.current?.off();
    //     socketRef.current = io(`/channels/${groupId}/${channelId}`, {
    //         transports: ['websocket']
    //     });

    //     return () => {
    //         socketRef.current?.off();
    //     }
    // }, [channelId, groupId]);
    
    return (
        <div id='chat-body-container' >
            <GroupList />
            <Route path='/:groupId/channels/:channelId'>
                <SocketContext.Provider value={socketRef.current}>
                    <Group />
                </SocketContext.Provider>
            </Route>
            <Route path='/profile/@me'>
                <Profile />
            </Route>
        </div>
    );
};

export default ChatBodyContainer;