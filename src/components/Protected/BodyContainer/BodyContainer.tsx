import { useEffect, useState } from "react";
import ChannelList, { ChannelList as Channels } from "./ChannelList/ChannelList";
import GroupList, { Group } from "./GroupList/GroupList";
import './BodyContainer.scss';
import { useParams } from "react-router";

interface URIParams {
    groupId: string;
    channelId: string;
}

const BodyContainer: React.FC = (props): JSX.Element => {
    const [groups, setGroups] = useState<[Group]>();
    const [channels, setChannels] = useState<Channels>();
    const { groupId, channelId } = useParams<URIParams>();
    
    useEffect(() => {
        fetch('/user/chat', {
            method: 'Post',
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
    }, []);
    
    return (
        <div id='body-container' >
            <GroupList groups={groups} />
            <ChannelList channels={channels} />
        </div>
    );
};

export default BodyContainer;