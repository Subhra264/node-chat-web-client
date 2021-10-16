import {
    ChangeEvent,
    ChangeEventHandler,
    MouseEvent,
    MouseEventHandler,
    useContext,
    useEffect,
    useState
} from 'react';
import { Link, useHistory } from 'react-router-dom';
import ModalBox from '../../../ModalBox/ModalBox';
import { FormProps } from '../../../Form/Form';
import { FetchDetails, getRequest, protectedRequest } from '../../../../utils/fetch-requests';
import { GroupContext, GroupContextValue } from '../../../../utils/contexts';
import ResponseError from '../../../../utils/ResponseError';

enum ChannelType {
    TEXT = 'text',
    VOICE = 'voice'
}

interface Channel {
    reference: string;
    name: string;
    // type: ChannelType;
    // category?: string;
    // unreadMsg?: number;
}

interface VoiceChannel extends Channel {
    type: ChannelType.VOICE;
}

interface TextChannel extends Channel {
    type: ChannelType.TEXT;
}

export interface IChannelList {
    textChannels: [TextChannel] | undefined;
    voiceChannels: [VoiceChannel] | undefined;
}

interface ChannelListProps {
    channels: IChannelList | undefined;
}

const ChannelList: React.FC = (props): JSX.Element => {
    const [show, setShow] = useState(false);
    const [channelList, setChannelList] = useState<Channel[]>([]);
    const [newChannelName, setNewChannelName] = useState('');
    const [error, setError] = useState<ResponseError>();
    const groupContext: GroupContextValue = useContext(GroupContext);
    const history = useHistory();

    const onChannelNameChange: ChangeEventHandler<HTMLInputElement> = (ev: ChangeEvent<HTMLInputElement>) => {
        setNewChannelName(ev.target.value);
    };

    const openModalBox: MouseEventHandler = (ev: MouseEvent) => {
        ev.preventDefault();
        setShow(true);
    };

    // Called to create a new Text Channel
    const createTextChannel: MouseEventHandler = (ev: MouseEvent) => {
        ev.preventDefault();

        const successHandler = (result: any) => {
            console.log('New Channel result', result);
            setShow(false);
            setChannelList(oldChannelList => [
                ...oldChannelList,
                result // Add the newly created channel to the channelList
            ]);
            history.push(`/${groupContext.groupId}/channels/${result.reference}`);
        };

        const errorHandler = (err: Error) => {
            console.log('Error creating a new channel', err.message);
            setError(err as ResponseError);
        };

        const fetchDetails: FetchDetails = {
            fetchURI: '/api/group/text-channel',
            method: 'POST',
            body: {
                name: newChannelName,
                parentGroup: groupContext.groupId
            }
        };

        // Makes POST request to /api/group/text-channel endpoint
        protectedRequest(
            fetchDetails,
            successHandler,
            errorHandler
        );
    };

    useEffect(() => {
        const successHandler = (result: any) => {
            console.log('ChannelList result', result);
            setChannelList(result);
        };

        const errorHandler = (err: Error) => {
            console.log('Error creating new Channel', err.message);
        };

        // Fetches the list of channels in the group
        getRequest(
            `/api/groups/${groupContext.groupId}/channels`,
            successHandler,
            errorHandler
        );
    }, [groupContext.groupId]);

    const formProps: FormProps = {
        fields: {
            channelName: {
                type: 'text',
                required: true,
                placeholder: 'Channel Name',
                value: newChannelName,
                onChange: onChannelNameChange
            }
        },
        onSubmit: createTextChannel, 
        error
    };

    return (
        <div className='item-list'>
            {
                channelList.map((channel) => (
                    <div key={channel.reference} className={`item`}>
                        <Link to={`/${groupContext.groupId}/channels/${channel.reference}`}>{channel.name}</Link>
                    </div>
                ))
            }
            <div className='item add-item' onClick={openModalBox}>
                +
            </div>
            {
                // props.channels?.voiceChannels?.map((channel) => (
                //     <div key={channel.id} className={`item ${channel.type}`} >
                //         <Link to='' className='link'>{channel.name}</Link>
                //     </div>
                // ))
            }
            {/* <div className='item add-item'>
                +
            </div> */}
            <ModalBox show={show} setShow={setShow} form={formProps} />
        </div>
    );
};

export default ChannelList;