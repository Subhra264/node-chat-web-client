import {
    ChangeEvent,
    ChangeEventHandler,
    MouseEvent,
    MouseEventHandler,
    useContext,
    useEffect,
    useState
} from 'react';
import { Link } from 'react-router-dom';
import ModalBox from '../../../ModalBox/ModalBox';
import { FormProps } from '../../../Form/Form';
import { FetchDetails, getRequest, protectedRequest } from '../../../../utils/fetch-requests';
import { GroupContext, GroupContextValue } from '../../../../utils/contexts';
import { useAccessToken } from '../../../../hooks/useUserSelector';
import { useDispatch } from 'react-redux';

enum ChannelType {
    TEXT = 'text',
    VOICE = 'voice'
}

interface Channel {
    _id: string;
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

export interface ChannelList {
    textChannels: [TextChannel] | undefined;
    voiceChannels: [VoiceChannel] | undefined;
}

interface ChannelListProps {
    channels: ChannelList | undefined;
}

const ChannelList: React.FC<ChannelListProps> = (props: ChannelListProps): JSX.Element => {
    const [show, setShow] = useState(false);
    const [channelList, setChannelList] = useState<Channel[]>([]);
    const [newChannelName, setNewChannelName] = useState('');
    const groupContext: GroupContextValue = useContext(GroupContext);
    const accessToken = useAccessToken();
    const dispatch = useDispatch();

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
        };

        const errorHandler = (err: Error) => {
            console.log('Error creating a new channel', err.message);
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
            accessToken,
            successHandler,
            errorHandler,
            dispatch
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
            accessToken,
            successHandler,
            errorHandler,
            dispatch
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
        onSubmit: createTextChannel
    };

    return (
        <div className='item-list'>
            {
                channelList.map((channel) => (
                    <div key={channel._id} className={`item`}>
                        <Link to={`/${groupContext.groupId}/channels/${channel._id}`} className='link'>{channel.name}</Link>
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