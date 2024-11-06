
import Api from '../constants/Api';

const FullImage = ({ picture, imgClass, src }) => {

  console.log(src)



  const imgClassName = ` ${imgClass}`;

  if (src) {
    return <img src={src} alt="post image" className={imgClassName} />;
  } else if (picture) {
    let src = picture;
    if (!src.includes("http")) src = `${Api.RISHIVAR_BACKEND_URL}${src}`;
    return <img src={src} alt="mdo" className={imgClassName} />;
  } else {
    return <p>Image not available</p>;
  }

  // <div style={{ height: size, width: size, fontSize: size / 2 }} className={className}>
  //   {name.substring(0, 1)}
  // </div>
};

export default FullImage;
