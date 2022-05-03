import { Image } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Modal from '../index';

const api = import.meta.env.VITE_API_URL;

export default function ModalPlayer({ isOpen, onClose, data, path }) {
  const [token, setToken] = useState('');

  useEffect(() => {
    setToken(localStorage.getItem('ACCT'));
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={data.name}>
      {data.type === 'video' && (
        <video width='100%' height='140' controls>
          <source src={`${api}/files/?path=${path}&token=${token}`} />
        </video>
      )}

      {data.type === 'image' && (
        <Image src={`${api}/files/?path=${path}&token=${token}`} />
      )}

      {data.type === 'audio' && (
        <audio controls style={{ width: '100%', borderRadius: '10px' }}>
          <source src={`${api}/files/?path=${path}&token=${token}`} />
        </audio>
      )}
      {data.type === 'pdf' && (
        <iframe
          width='100%'
          height='1000vh'
          src={`${api}/files/?path=${path}&token=${token}`}
        />
      )}

      {!data.type && <p>Unsupported file :(</p>}
    </Modal>
  );
}
