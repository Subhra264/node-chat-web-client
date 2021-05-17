import { useState } from "react";
import GroupList, { Group } from "./GroupList/GroupList";


const BodyContainer: React.FC = (): JSX.Element => {
    const [groups, setGroups] = useState<[Group]>();
    
    return (
        <div id='body-container' >
            <GroupList groups={groups} />
        </div>
    );
};

export default BodyContainer;