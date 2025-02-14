import { Button } from '@components/UI/Button';
import { Input } from '@components/UI/Input';
import { Spinner } from '@components/UI/Spinner';
import { ArrowRightIcon } from '@heroicons/react/outline';
import type { FC } from 'react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  sendMessage: (message: string) => Promise<boolean>;
}

const Composer: FC<Props> = ({ sendMessage }) => {
  const [message, setMessage] = useState<string>('');
  const [sending, setSending] = useState<boolean>(false);

  const canSendMessage = !sending && message.length > 0;

  const handleSend = async () => {
    if (!canSendMessage) {
      return;
    }
    setSending(true);
    const sent = await sendMessage(message);
    if (sent) {
      setMessage('');
    } else {
      toast.error('Error sending message');
    }
    setSending(false);
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="flex space-x-4 p-4">
      <Input
        type="text"
        placeholder="Type Something"
        value={message}
        onKeyDown={handleKeyDown}
        onChange={(event) => setMessage(event.target.value)}
      />
      <Button disabled={!canSendMessage} onClick={handleSend} variant="primary" aria-label="Send message">
        <div className="flex items-center">
          <span>Send</span>
          {!sending && <ArrowRightIcon className="h-5 w-5 ml-2" />}
          {sending && <Spinner size="sm" className="h-5 w-5 ml-2" />}
        </div>
      </Button>
    </div>
  );
};

export default Composer;
