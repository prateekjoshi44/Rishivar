import { useParams } from 'react-router-dom';
import { useGetAstroQuery } from '../../services/astroSlice';
import { useDeleteFollowMutation, usePostFollowMutation } from '../../services/followSlice';
import { useGetProfileQuery } from '../../services/profileSlice';
import ApiErrorModal from '../../components/modal/ApiErrorModal';
import Page from '../../layout/Page';
import { IoStar } from 'react-icons/io5';
import { FaGlasses, FaUsers } from 'react-icons/fa';
import { SlUserFollow, SlUserUnfollow } from "react-icons/sl";
import CheckBalanceModal from '../../components/CheckBalanceModal';
import NotificationPermission from '../../firebase/fcm/NotificationPermission';
import ProfilePicture from '../../components/ProfilePicture';

const AstroDetails = () => {
    const { id } = useParams();
    const astroRes = useGetAstroQuery(id);
    const userProfileRes = useGetProfileQuery();
    const [postFollow, postFollowRes] = usePostFollowMutation();
    const [deleteFollow, deleteFollowRes] = useDeleteFollowMutation();

    const reviews = [
        { name: "V", date: "Thu Jul 13 2023 9:21 PM", comment: "Very knowledgeable about his craft", stars: "★★★★★" },
        { name: "S", date: "Mon May 08 2023 5:04 PM", comment: "Perfect readings.. Everything was on point", stars: "★★★★★" },
        { name: "S", date: "Sat May 06 2023 11:22 PM", comment: "Perfect readings.. Everything was on point", stars: "★★★★★" },
        { name: "S", date: "Sat May 06 2023 11:05 PM", comment: "धन्यवाद पंडित जी", stars: "★★★★★" },
        { name: "S", date: "Sat May 06 2023 10:41 PM", comment: "धन्यवाद पंडित जी", stars: "★★★★★" },
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
    // if (placeholder) {
    //     return (
    //         <div className="col card-group text-decoration-none">
    //             <div className="card shadow rounded-3 overflow-hidden">
    //                 <div className="d-flex ms-2 my-2 align-items-center">
    //                     <div className="placeholder-glow">
    //                         <span className="placeholder col-2"></span>
    //                     </div>
    //                     <div className="ms-3 placeholder-glow">
    //                         <span className="placeholder col-4"></span>
    //                         <div className="text-muted">
    //                             <span className="placeholder col-2"></span>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <div className="placeholder-glow">
    //                     <span className="placeholder w-100" style={{ height: 350 }}></span>
    //                 </div>
    //                 <div className="px-2 pt-2 placeholder-glow">
    //                     <p className="placeholder col-12"></p>
    //                     <p className="placeholder col-6"></p>
    //                     <div className="row row-cols-2 border-top mt-2">
    //                         <div className="col btn border-end rounded-0 ">
    //                             <span className='placeholder'>Like</span>
    //                         </div>
    //                         <div className="col btn border-start rounded-0 ">
    //                             <span className='placeholder'>Follow</span>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </div>
    //         </div>
    //     );
    // }

    if (astroRes.isLoading || userProfileRes.isLoading) return (
        <>
            <div className="row d-flex align-items-center mb-3">
                <div className="col-auto">
                    <div className="placeholder-glow">
                        <div className="rounded-circle bg-light" style={{ height: 150, width: 150 }}></div>
                    </div>
                </div>
                <div className='col h-100'>
                    <div className="placeholder-glow">
                        <span className="placeholder col-4"></span>
                    </div>
                    <div className="placeholder-glow">
                        <span className="placeholder col-2"></span>
                    </div>
                </div>
                <div className="col-auto h-100 mb-5 text-end p-0 me-2">
                    <div className="placeholder-glow">
                        <span className="placeholder col-2"></span>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-nowrap mb-lg-2 hide-scroll overflow-auto">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="placeholder-glow rounded-pill border border-2 border-primary px-2 me-2 mb-2 fs-15 bg-light" style={{ width: '100px', height: '30px' }}></div>
                ))}
            </div>
            <div className="d-flex justify-content-around mb-3 pb-2 border-dark border-bottom border-1">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div key={index} className="text-center">
                        <div className="placeholder-glow">
                            <span className="placeholder col-2"></span>
                        </div>
                        <div className="placeholder-glow">
                            <span className="placeholder col-1"></span>
                        </div>
                        <div className="placeholder-glow">
                            <span className="placeholder col-3"></span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mb-3">
                <div className="placeholder-glow">
                    <span className="placeholder col-4"></span>
                </div>
                <div className="placeholder-glow">
                    <span className="placeholder col-8"></span>
                </div>
            </div>
            <div className="mb-3">
                <div className="placeholder-glow">
                    <span className="placeholder col-4"></span>
                </div>
                <div className="d-flex flex-wrap">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="placeholder-glow rounded-pill border border-secondary border-1 text-secondary px-2 mx-1 mb-2 fs-15 bg-light" style={{ width: '100px', height: '30px' }}></div>
                    ))}
                </div>
            </div>
            <div className="mb-3">
                <div className="placeholder-glow">
                    <span className="placeholder col-4"></span>
                </div>
                <div className="d-flex flex-wrap">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <div key={index} className="card w-100 mb-1">
                            <div className="d-flex">
                                <div className="d-flex align-items-center justify-content-center ms-2">
                                    <div className="placeholder-glow bg-primary rounded-circle" style={{ height: 50, width: 50 }}></div>
                                </div>
                                <div className="mb-1 py-0">
                                    <div className="placeholder-glow ms-2">
                                        <span className="placeholder col-2"></span>
                                    </div>
                                    <div className="placeholder-glow ms-2">
                                        <span className="placeholder col-1"></span>
                                    </div>
                                    <div className="placeholder-glow ms-2">
                                        <span className="placeholder col-3"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );

    if (astroRes.isError) return <ApiErrorModal res={astroRes} />;
    if (userProfileRes.isError) return <ApiErrorModal res={userProfileRes} />;

    const { name, follows, skills, categories, description, experience, rating, orders, followers, languages } = astroRes.data;
    const isFollowed = follows.some((l) => l.userId === userProfileRes.data.id);

    return (
        <div className="d-flex flex-column h-100 w-100">
            <div className="flex-grow-1">
                <Page>
                    <div className="row d-flex align-items-center mb-3">
                        <div className="col-auto">
                            <ProfilePicture picture={astroRes?.data?.astroPicture?.src} name={name} size={150} />
                        </div>
                        <div className='col h-100'>
                            <p className="h5 mb-0 mb-3">{name}</p>
                            {languages && languages.map((language, index) => (
                                <span key={`${language}-${index}`} className="badge bg-warning text-dark me-1">{language}</span>
                            ))}
                        </div>
                        <div className="col-auto h-100 mb-5 text-end p-0 me-2">
                            <button
                                className={`btn btn-sm text-center ${isFollowed ? 'btn-primary' : 'btn-dark'}`}
                                onClick={handleFollowClick}
                                disabled={postFollowRes.isLoading || deleteFollowRes.isLoading}
                            >
                                {isFollowed ? <SlUserUnfollow /> : <SlUserFollow />}
                            </button>
                        </div>
                    </div>
                    <div className="d-flex flex-nowrap mb-lg-2 hide-scroll overflow-auto">
                        {skills?.map((skill, index) => (
                            <p key={`${skill}-${index}`} className="rounded-pill text-primary border border-2 border-primary px-2 me-2 text-nowrap mb-2 fs-15">{skill}</p>
                        ))}
                    </div>
                    <div className="d-flex justify-content-around mb-3 pb-2 border-dark border-bottom border-1">
                        <div className="text-center">
                            <IoStar className="fs-3 text-warning" />
                            <p className="mb-0">{rating}</p>
                            <small className="text-muted">Rating</small>
                        </div>
                        <div className="text-center">
                            <FaGlasses className="fs-3 text-secondary" />
                            <p className="mb-0">{experience} Yrs</p>
                            <small className="text-muted mt-0">Experience</small>
                        </div>
                        <div className="text-center">
                            <FaUsers className="fs-3 text-primary" />
                            <p className="mb-0">{orders}+</p>
                            <small className="text-muted">Orders</small>
                        </div>
                        <div className="text-center">
                            <FaUsers className="fs-3 text-danger" />
                            <p className="mb-0">{followers?.length}</p>
                            <small className="text-muted">Followers</small>
                        </div>
                    </div>
                    <div className="mb-3">
                        <h4 className="mb-2">Intro</h4>
                        <p>{description}</p>
                    </div>
                    <div className="mb-3">
                        <h4 className="mb-2">Categories</h4>
                        <div className="d-flex flex-wrap">
                            {categories?.map((category, index) => (
                                <p key={`${category}-${index}`} className="rounded-pill border border-secondary border-1 text-secondary px-2 mx-1 text-nowrap fs-15">{category}</p>
                            ))}
                        </div>
                    </div>
                    <div className="mb-3">
                        <h4 className="mb-2">Reviews</h4>
                        <div className="d-flex flex-wrap">
                            {reviews.map((review, index) => (
                                <div key={index} className="card w-100 mb-1">
                                    <div className="d-flex">
                                        <div className="d-flex align-items-center justify-content-center ms-2">
                                            <div className="bg-primary d-flex align-items-center justify-content-center rounded-circle" style={{ height: 50, width: 50 }}>
                                                <div className="fw-bold fs-2">{review.name}</div>
                                            </div>
                                        </div>
                                        <div className="mb-1 py-0">
                                            <div className="ms-2 text-warning fs-5">{review.stars}</div>
                                            <span className="fs-11 ms-2">{review.date}</span>
                                            <div className='ms-2'>{review.comment}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </Page>
            </div>
            <div className='border-top border-3 px-2 py-3 bg-white position-sticky bottom-0 start-0 end-0'>
                {window.cordova ? (
                    <div className="row g-2">
                        <div className="col"><CheckBalanceModal type={"Chat"} /></div>
                        <div className="col"><CheckBalanceModal type={"AudioCall"} /></div>
                        <div className="col"><CheckBalanceModal type={"VideoCall"} /></div>
                    </div>
                ) : (
                    <NotificationPermission>
                        <div className="row g-2">
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

export default AstroDetails;
