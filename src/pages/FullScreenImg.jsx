import { useNavigate, useParams } from 'react-router-dom';
import Api from '../constants/Api';

const FullScreenImg = () => {
  const navigate = useNavigate();
  const { src } = useParams();

  const imgHandle = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      onClick={() => navigate(-1)}
      className='d-flex justify-content-center align-items-center bg-black position-absolute top-0 bottom-0 start-0 end-0 bg-opacity-75'
      style={{ zIndex: 9999 }}
    >
      <img
        onClick={imgHandle}
        className='w-100 object-fit-contain'
        src={`${Api.RISHIVAR_BACKEND_URL}uploads/${src}`}
        alt="Full Screen"
      />
    </div>
  );
};

export default FullScreenImg;
