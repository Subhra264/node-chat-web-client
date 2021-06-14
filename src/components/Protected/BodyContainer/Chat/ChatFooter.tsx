
const ChatFooter: React.FC = (): JSX.Element => {
    return (
        <>
            <div className='editor-container'>
                <textarea id="editor" placeholder="Type here..." />
            </div>
            <div className='send'>
                <button>Send</button>
            </div>
        </>
    );
};


export default ChatFooter;