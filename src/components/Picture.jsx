import { useGetPostsQuery } from '../services/postSlice';
import { useParams } from 'react-router-dom';
import PageLoading from './PageLoading';
import ApiErrorModal from './modal/ApiErrorModal';
import Api from '../constants/Api';

const Picture = () => {
  const { id } = useParams();
  const postRes = useGetPostsQuery();

  // Ensure postRes.data is defined and is an array
  const posts = postRes.data && Array.isArray(postRes.data) ? postRes.data : [];
  const post = posts.find(post => post.id === id);
  console.log(post);

  if (postRes.isLoading) return <PageLoading />;
  if (postRes.isError) return <ApiErrorModal res={postRes} />;

  if (post && post.upload && post.upload.src) {
    const src = `${Api.RISHIVAR_BACKEND_URL}${post.upload.src}`;
    return <img src={src} alt="post image" className='position-absolute ' />;
  }
  else {
    return <p>Image not available</p>;
  }

  // <div style={{ height: size, width: size, fontSize: size / 2 }} className={className}>
  //   {name.substring(0, 1)}
  // </div>
};

export default Picture;
