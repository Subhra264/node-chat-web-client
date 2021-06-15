import { Link } from "react-router-dom";

enum ChannelType {
    TEXT = 'text',
    VOICE = 'voice'
}

interface Channel {
    id: string;
    name: string;
    type: ChannelType;
    category?: string;
    unreadMsg?: number;
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
    const createTextChannel = () => {
        // TODO: Open a modal box
    };

    return (
        <div className='item-list'>
            {
                props.channels?.textChannels?.map((channel) => (
                    <div key={channel.id} className={`item ${channel.type}`}>
                        <Link to='' className='link'>{channel.name}</Link>
                    </div>
                ))
            }
            <div className='item add-item' onClick={createTextChannel}>
                +
            </div>
            {
                props.channels?.voiceChannels?.map((channel) => (
                    <div key={channel.id} className={`item ${channel.type}`} >
                        <Link to='' className='link'>{channel.name}</Link>
                    </div>
                ))
            }
            <div className='item add-item'>
                +
            </div>
        </div>
    );
};

export default ChannelList;