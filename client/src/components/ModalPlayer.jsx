import { AspectRatio, Image } from '@chakra-ui/react';
import Modal from './Modal';

export default function ModalPlayer({ isOpen, onClose, data, path }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={data.name}>
      {data.type === 'video' && (
        <video width='100%' height='140' controls>
          <source src={`http://192.168.0.20:5000/api/files/?path=${path}`} />
        </video>
      )}

      {data.type === 'image' && (
        <Image src={`http://192.168.0.20:5000/api/files/?path=${path}`} />
      )}

      {data.type === 'audio' && (
        <audio controls style={{ width: '100%', borderRadius: '10px' }}>
          <source src={`http://192.168.0.20:5000/api/files/?path=${path}`} />
        </audio>
      )}
        {data.type === 'pdf' && (
            <iframe width="100%"  height="1000vh" src={`http://192.168.0.20:5000/api/files/?path=${path}`}/>
        )}

    </Modal>
  );
}
