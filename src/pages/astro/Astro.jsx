import { useParams } from 'react-router-dom';
import { useGetAstroQuery } from '../../services/astroSlice';
import { useDeleteFollowMutation, usePostFollowMutation } from '../../services/followSlice';
import { useGetProfileQuery } from '../../services/profileSlice';
import ApiErrorModal from '../../components/modal/ApiErrorModal';
import Page from '../../layout/Page';

import CheckBalanceModal from '../../components/CheckBalanceModal';
import NotificationPermission from '../../firebase/fcm/NotificationPermission';
import ProfilePicture from '../../components/ProfilePicture';
import Icons from '../../components/ui/Icons';

const Astro = () => {
  const { id } = useParams();
  const astroRes = useGetAstroQuery(id);
  const userProfileRes = useGetProfileQuery();

  const [postFollow, postFollowRes] = usePostFollowMutation();
  const [deleteFollow, deleteFollowRes] = useDeleteFollowMutation();

  const reviews = [
    { name: "Vivek Rajput", comment: "“ Lorem ipsum dolor sit amet consectetur. Diam vel interdum in feugiat gravida sed nunc. Sagittis donec varius felis feugiat diam suspendisse. In cras facilisis odio id magna leo quis blandit adipiscing.”", },
    { name: "Ritik negi", comment: "“ Lorem ipsum dolor sit amet consectetur. Diam vel interdum in feugiat gravida sed nunc. Sagittis donec varius felis feugiat diam suspendisse. In cras facilisis odio id magna leo quis blandit adipiscing.”", },

  ];

  const handleFollowClick = async () => {
    if (typeof id !== 'undefined') {
      try {
        if (isFollowed) await deleteFollow({ astroId: id });
        else await postFollow({ astroId: id });
        astroRes.refetch();
      } catch (error) {
        console.error(`Failed to ${isFollowed ? 'unfollow' : 'follow'}:`, error);
      }
    }
  };
  const totalReviews = 24;
  const starData = {
    5: 14,
    4: 6,
    3: 3,
    2: 1,
    1: 0,
  };
  const getPercentage = (count) => (count / totalReviews) * 100;

  if (astroRes.isLoading || userProfileRes.isLoading) return (
    <div className="d-flex flex-column h-100 w-100 ">
      <div className="flex-grow-1 overflow-hidden">
        <Page>
          <div className="row d-flex align-items-center mb-3">
            <div className="d-flex   align-items-center placeholder-glow">
              <div className="col-auto placeholder rounded-4">
                <img src="" alt="" style={{ height: 150, width: 150 }} />
              </div>

              <div className='col h-100 placeholder-glow'>
                <div className="ms-2 mb-1 d-flex align-items-center placeholder ">{Icons.star("me-2")}
                  <p className='fs-11 placeholder'>4.6 Rated, 10 Reviews</p>
                </div>

                <p className="h5 mb-0 mb-2 ms-3 placeholder">Astro</p>

                <div className="d-flex justify-content-evenly align-items-center mb-1 placeholder-glow">
                  <div className="text-center placeholder">
                    8
                    <p>Post</p>
                  </div>
                  <div className="text-center placeholder">
                    8
                    <p>Follower</p>
                  </div>
                  <div className="text-center placeholder">
                    8
                    <p>Order</p>
                  </div>
                </div>

                <button
                  className={` ms-1 rounded-4 btn w-100 btn-sm text-center `}

                >

                </button>
              </div>
            </div>
          </div>
          <div className=" d-flex  justify-content-center mb-3">
            <div className="w-50   " style={{ height: 2, borderTop: "1px solid #FFA400", }} />
          </div>

          <div className="mb-3">
            <div className="d-flex align-items-center mb-1 placeholder-glow">
              {Icons.knowldge("me-1 fs-11")}
              <span>Knowledge:</span>
              <div className="d-flex flex-nowrap mb-lg-2 hide-scroll overflow-scroll ms-2 placeholder" style={{ flex: 1 }}>
                jkchwuohbwuohb
              </div>
            </div>

            <div className="d-flex align-items-center mb-1 placeholder-glow">
              {Icons.languages("me-1")}
              <span>Language:</span>
              <div className="d-flex flex-nowrap mb-lg-2 hide-scroll overflow-scroll ms-2 placeholder" style={{ flex: 1 }}>
                jkchwuohbwuohb
              </div>
            </div>

            <div className="d-flex align-items-center placeholder-glow">
              {Icons.experience("me-1")}
              <span>Experience:</span>
              <div className="d-flex flex-nowrap mb-lg-2 hide-scroll overflow-scroll ms-2 placeholder" style={{ flex: 1 }}>
                jkchwuohbwuohb
              </div>
            </div>
          </div>


          <div className="mb-3 ">
            <p className="mb-2 fs-4 fw-semibold placeholder-glow">Description</p>
            <p className='placeholder'> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae, delectus?</p>
          </div>
          <div className=" d-flex  justify-content-center ">
            <div className="w-50   " style={{ height: 2, borderTop: "1px solid #FFA400", }} />
          </div>
          <div className=" mt-4">
            <p className="mb-2 fs-4 fw-semibold">Reviews</p>
            {reviews.map((review, index) => (
              <div key={index} className=" mb-3">
                <div className="y placeholder-glow">
                  <div className="d-flex align-items-center mb-2 placeholder-glow">

                    <div className="d-flex placeholder">
                      <img src="" alt="" style={{ size: 50 }} />
                      <div className="ms-3">

                        <p className="card-title mb-0  fw-semibold placeholder">{review.name}</p>
                        <p>Wrote a Review</p>
                      </div>
                    </div>

                  </div>
                  <div className="mb-2 ">
                    {Icons.star("me-1")}
                    {Icons.star("me-1")}
                    {Icons.star("me-1")}
                    {Icons.star("me-1")}
                    {Icons.star("me-1")}
                  </div>
                  <p className="mb-3 placeholder">{review.comment}</p>
                </div>
                <div className=" d-flex  justify-content-center ">
                  <div className="w-50   " style={{ height: 2, borderTop: "1px solid #FFA400", }} />
                </div>
              </div>
            ))}
          </div>
        </Page>
      </div>

      <div className='rounded-top-4 shadow border-top border-3  py-2 bg-white d-flex align-items-between  placeholder-glow'>
        <div className="rounded-pill placeholder mx-4 px-3 py-2"> {Icons.phoneCall()} ₹5/m</div>
        <div className="rounded-pill placeholder mx-4 px-3 py-2"> {Icons.phoneCall()} ₹5/m</div>
        <div className="rounded-pill placeholder mx-4 px-3 py-2"> {Icons.phoneCall()} ₹5/m</div>
      </div>
    </div>
  );


  if (astroRes.isError) return <ApiErrorModal res={astroRes} />;
  if (userProfileRes.isError) return <ApiErrorModal res={userProfileRes} />;

  const { name, follows, skills, description, languages, experience } = astroRes.data;
  const isFollowed = follows.some((l) => l.userId === userProfileRes.data.id);

  return (
    <div className="d-flex flex-column h-100 w-100 ">
      <div className="flex-grow-1 overflow-hidden">
        <Page>
          <div className="row  mb-3 ">
            <div className="d-flex   ">
              <div className="">
                <ProfilePicture
                  imgClass={"rounded-5 object-fit-cover"}
                  picture={astroRes?.data?.astroPicture?.src}
                  name={name}
                  size={150}
                />
              </div>

              <div className=' d-flex flex-column  ms-2 w-100'>
                <div className="ms-2 mb-1 d-flex align-items-center ">{Icons.star("me-2 fs-13")}
                  <p className='fs-13'>4.6 Rated, 10 Reviews</p>
                </div>

                <p className="h5 mb-0 mb-2 ms-3 fw-bold fs-15">{name}</p>

                <div className="d-flex justify-content-evenly align-items-center   my-auto">
                  <div className="text-center fw-bold fs-13 ">
                    8
                    <p className='fw-normal fs-10'>Post</p>
                  </div>
                  <div className="text-center  fw-bold fs-13">
                    8
                    <p className='fw-normal fs-10'>Follower</p>
                  </div>
                  <div className="text-center  fw-bold fs-13">
                    8
                    <p className='fw-normal fs-10'>Order</p>
                  </div>
                </div>

                <button
                  className={` ms-1 rounded-4 btn w-100 btn-sm text-center `}
                  onClick={handleFollowClick}
                  disabled={postFollowRes.isLoading || deleteFollowRes.isLoading}
                >
                  {isFollowed ?
                    <div className="btn  btn-white border border-primary w-100 rounded-pill text-primary fs-15">
                      {Icons.follow("me-2 ")}
                      UnFollow
                    </div>
                    :
                    <div className="btn  btn-white border border-primary w-100 rounded-pill text-primary fs-15">
                      {Icons.follow("me-2")}
                      Follow
                    </div>
                  }
                </button>
              </div>

            </div>
          </div>

          <div className=" d-flex  justify-content-center mb-3 ">
            <div className=" " style={{ height: 2, width: 150, borderTop: "1px solid #FFA400", }} />
          </div>


          <div className="mb-3 " >
            <div className="d-flex align-items-start  mb-1">
              <div className='d-flex align-items-center fs-13'>
                {Icons.knowldge("me-1 fs-13")}

                Knowledge:</div>
              <div className="d-flex flex-wrap mb-lg-2  ms-2 " >
                {skills?.map((skill, index) => (
                  <p key={`${skill}-${index}`} className="me-1 fs-13"> {skill}{index < skills.length - 1 && ', '}</p>
                ))}
              </div>
            </div>

            <div className="d-flex align-items-start  mb-1">
              <div className='d-flex align-items-center fs-13'>
                {Icons.languages("me-1  fs-13")}
                Language:</div>
              <div className="d-flex align-items-start flex-wrap mb-lg-2  ms-2" >
                {languages?.map((language, index) => (
                  <p key={`${language}-${index}`} className="me-1 fs-13">
                    {language}{index < languages.length - 1 && ', '}
                  </p>
                ))}
              </div>
            </div>

            <div className="d-flex align-items-start  mb-1">
              <div className='d-flex align-items-center fs-13'>
                {Icons.experience2("me-1 fs-13")}
                Experience:</div>
              <div className="d-flex align-items-start flex-wrap mb-lg-2  ms-2 fs-13" >
                {/* {categories?.map((category, index) => (
                  <p key={`${category}-${index}`} className="me-1 fs-13">
                    {category}{index < categories.length - 1 && ', '}
                  </p>
                ))} */}
                {experience} Years

              </div>
            </div>
          </div>



          <div className="mb-3">
            <p className="mb-1 fs-15 fw-semibold">About</p>
            <p className='fs-13'>{description}</p>
          </div>

          <div className=" d-flex   justify-content-center ">
            <div className=" " style={{ height: 2, width: 150, borderTop: "1px solid #FFA400", }} />
          </div>


          <div className=" mt-4">
            <p className="mb-2 fs-15 fw-semibold">Reviews</p>

            <div className="mb-4">
              <div className="container px-4 py-3 shadow-sm bg-white rounded w-100 rounded-5 border" >
                <div className="d-flex align-items-center justify-content-between">

                  <div className="" >
                    <div className="d-flex align-items-baseline mb-2  justify-content-center">
                      <h2 className=" fw-bold">5/</h2><span className="small fs-15 fw-bold">5</span>
                    </div>


                    {[...Array(5)].map((_, index) => (
                      <i key={index} className="text-warning fs-4"> {Icons.star("fs-15 text-warning")}</i>
                    ))}

                    <p className="m-0">{totalReviews} Reviews</p>
                  </div>


                  <div className="ps-3 w-50">
                    {Object.keys(starData).reverse().map((star) => (
                      <div key={star} className="d-flex align-items-center">
                        <span className="me-2">{star}</span>
                        <div className="progress w-100" style={{ height: '8px' }}>
                          <div
                            className="progress-bar bg-warning"
                            role="progressbar"
                            style={{ width: `${getPercentage(starData[star])}%` }}
                            aria-valuenow={getPercentage(starData[star])}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {reviews.map((review, index) => (
              <div key={index} className=" mb-3">
                <div className="y">
                  <div className="d-flex align-items-center mb-2">

                    <div className="d-flex">
                      <ProfilePicture
                        imgClass={"rounded-circle object-fit-cover"}
                        picture={astroRes?.data?.astroPicture?.src}
                        name={name}
                        size={50}
                      />
                      <div className="ms-3">

                        <p className="card-title mb-0  fw-semibold fs-15">{review.name}</p>
                        <p className='fs-10'>Wrote a Review</p>
                      </div>
                    </div>

                  </div>
                  <div className="mb-2 fs-13 ">
                    {Icons.star("me-1")}
                    {Icons.star("me-1")}
                    {Icons.star("me-1")}
                    {Icons.star("me-1")}
                    {Icons.star("me-1")}
                  </div>
                  <div className="d-flex ">
                    <div className=""> {Icons.comment("fs-16 me-2")}</div>
                    <p className="mb-3 fs-13">{review.comment}</p>
                  </div>
                </div>

                <div className=" d-flex  justify-content-center ">
                  <div className="w-100   " style={{ height: 2, borderTop: "1px solid #6B6B6B80", }} />
                </div>

              </div>
            ))}
          </div>
        </Page>
      </div>

      <div className='rounded-top-4 shadow border-top border-3 px-2 py-3 bg-white'>
        {window.cordova ? (
          <div className="row g-2">
            <div className="col"><CheckBalanceModal type={"Chat"} /></div>
            <div className="col"><CheckBalanceModal type={"AudioCall"} /></div>
            <div className="col"><CheckBalanceModal type={"VideoCall"} /></div>
          </div>
        ) : (

          <NotificationPermission ><div className="row g-2">
            <div className="col"><CheckBalanceModal type={"Chat"} /></div>
            <div className="col"><CheckBalanceModal type={"AudioCall"} /></div>
            <div className="col"><CheckBalanceModal type={"VideoCall"} /></div>
          </div>
          </NotificationPermission>
        )}
      </div>
    </div>

  );
};

export default Astro;
