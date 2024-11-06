import Api from '../constants/Api'
import astroImg from "../assets/images/astroImg.png";

const ImgRenderer = ({ picture, className, ...attributes }) => {

  const imgClassName = "object-fit-cover w-100"

  if (picture) {

    let src = picture
    if (!src.includes("http")) src = Api.RISHIVAR_BACKEND_URL + src
    return <img
      src={src}
      className={className || imgClassName}
      {...attributes}
    />


  } else {
    return <div className='object-fit-cover d-flex justify-content-center align-items-center   h-100 '>
      <img className=" rounded-circle  opacity-50" style={{ width: 120 }} src={astroImg} alt="" />
    </div>
  }


}

export default ImgRenderer