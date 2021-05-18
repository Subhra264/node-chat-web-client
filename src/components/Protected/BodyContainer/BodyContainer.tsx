import { useEffect, useState } from "react";
import ChannelList, { ChannelList as Channels } from "./ChannelList/ChannelList";
import GroupList, { Group } from "./GroupList/GroupList";
import './BodyContainer.scss';

const BodyContainer: React.FC = (): JSX.Element => {
    const [groups, setGroups] = useState<[Group]>();
    const [channels, setChannels] = useState<Channels>();

    useEffect(() => {
        //Fetch the group data
    }, []);
    
    return (
        <div id='body-container' >
            <GroupList groups={groups} />
            <ChannelList channels={channels} />
        </div>
    );
};

export default BodyContainer;