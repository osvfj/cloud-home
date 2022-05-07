import { Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Modal from '../index';

const api = import.meta.env.VITE_API_URL;

export default function ModalPlayer({ isOpen, onClose, data, path }) {
  const [url, setUrl] = useState('');

  const getBlobUrl = async () => {
    const res = await fetch(`${api}/files/?path=${path}`, {
      headers: {
        authorization: localStorage.getItem('ACCT'),
      },
    });

    const blob = await res.blob();
    setUrl(URL.createObjectURL(blob));
  };

  useEffect(() => {
    getBlobUrl();
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={data.name}>
      {data.type === 'video' && (
        <video src={url} controls style={{ width: '100%' }} />
      )}

      {data.type === 'image' && <Image src={url} />}

      {data.type === 'audio' && (
        <audio
          src={url}
          controls
          style={{ width: '100%', borderRadius: '10px' }}
        />
      )}
      {data.type === 'pdf' && <iframe width='100%' height='1000vh' src={url} />}

      {!data.type && <p>Unsupported file :(</p>}
    </Modal>
  );
}
