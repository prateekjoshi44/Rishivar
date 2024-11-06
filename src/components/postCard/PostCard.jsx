




import { Link } from 'react-router-dom';
import ProfilePicture from '../ProfilePicture';
import Image from '../form/Image';
import Api from '../../constants/Api';
import Button from '../form/Button';
import { useDeleteLikeMutation, usePostLikeMutation } from '../../services/likeSlice';
import { useDeleteFollowMutation, usePostFollowMutation } from '../../services/followSlice';
import { useGetProfileQuery } from '../../services/profileSlice';
import { useGetPostsQuery } from '../../services/postSlice';
import ApiErrorModal from '../modal/ApiErrorModal';
import Icons from '../ui/Icons';

const PostCard = ({
    post,
    placeholder,
}) => {

    const userProfileRes = useGetProfileQuery();
    const postRes = useGetPostsQuery();

    const [postLike, postLikeRes] = usePostLikeMutation();
    const [deleteLike, deleteLikeRes] = useDeleteLikeMutation();
    const [postFollow, postFollowRes] = usePostFollowMutation();
    const [deleteFollow, deleteFollowRes] = useDeleteFollowMutation();

    const handleLikeClick = async (postId, isLiked) => {
        if (postId) {
            try {
                if (isLiked) {
                    await deleteLike({ postId });
                } else {
                    await postLike({ postId });
                }
                postRes.refetch();
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleFollowClick = async (astroId, isFollowed) => {
        try {
            if (isFollowed) {
                await deleteFollow({ astroId });
            } else {
                await postFollow({ astroId });
            }
            postRes.refetch();
        } catch (error) {
            console.error(error);
        }
    };

    // Placeholder handling for loading state
    if (placeholder) {
        return (
            <div className="col card-group text-decoration-none">
                <div className="card shadow rounded-3 overflow-hidden">
                    <div className="d-flex ms-3 my-2 align-items-center">
                        <div className="placeholder-glow d-flex align-items-center">
                            <span className="placeholder col-2 mx-2 rounded-circle" style={{ height: 50, width: 50 }}></span>
                            <div className="placeholder-glow">
                                <span className="placeholder col-8 me-5">Astro Name</span>
                                <span className="placeholder col-6">X Followers</span>
                            </div>
                        </div>
                    </div>
                    <div className="placeholder-glow">
                        <span className="placeholder w-100" style={{ height: 350 }}></span>
                    </div>
                    <div className="px-3 pt-2 placeholder-glow">
                        <p className="placeholder col-6"></p>
                        <p className="placeholder col-4"></p>
                        <div className="row row-cols-2 border-top mt-2">
                            <span className="placeholder btn col">Like</span>
                            <span className="placeholder btn col">Follow</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error modals
    if (postRes.isError) return <ApiErrorModal res={postRes} />;
    if (userProfileRes.isError) return <ApiErrorModal res={userProfileRes} />;
    if (postLikeRes.isError) return <ApiErrorModal res={postLikeRes} />;
    if (deleteLikeRes.isError) return <ApiErrorModal res={deleteLikeRes} />;
    if (postFollowRes.isError) return <ApiErrorModal res={postFollowRes} />;
    if (deleteFollowRes.isError) return <ApiErrorModal res={deleteFollowRes} />;

    // Like and Follow states
    const isLiked = userProfileRes.data && post.likes.some((l) => l.userId === userProfileRes.data.id);
    const isFollowed = userProfileRes.data && post.astro.follows.some((f) => f.userId === userProfileRes.data.id);
    // const followers = post.astro.follows.length;

    return (
        <div className="col card-group text-decoration-none ">
            <div className="card shadow-sm rounded-3 overflow-hidden rounded-4">
                <div className="d-flex justify-content-between">
                    <div className="d-flex ms-3 my-1 align-items-center ">
                        <Link to={`/Astro/${post.astroId}`}>
                            <ProfilePicture picture={post?.astro?.astroPicture?.src} imgClass="rounded-circle " name="profilePicture" size={32} />
                        </Link>
                        <div className="ms-3">
                            <Link to={`/Astro/${post.astroId}`} className="fw-semibold text-dark text-decoration-none text-dark">
                                {post.astro.name}
                            </Link>
                            {/* {followers > 0 && <div className="text-muted">{followers} Followers</div>} */}
                            <p className='fs-13'>Astrologer</p>
                        </div>


                    </div>

                    <div className="dropdown">
                        <div className=" " data-bs-toggle="dropdown" aria-expanded="false">
                            {Icons.tripleDots("m-3")}
                        </div>
                        <ul className="dropdown-menu rounded-10 mx-2 ">
                            <li>
                                <a className="dropdown-item fw-bold fs-12" href="#">{Icons.report("me-2")}Report</a>
                            </li>
                        </ul>
                    </div>

                </div >
                <p className="card-text my-2 ms-3">{post.text}</p>
                {
                    post.upload && (
                        <Link to={`/Img/${post.upload.src.split('/')[1]}`} className="link-success text-decoration-none object-fit-cover overflow-hidden" style={{ height: 320 }}>
                            <Image src={`${Api.RISHIVAR_BACKEND_URL}${post.upload.src}`} className="w-100 rounded" />
                        </Link>
                    )
                }
                <div className="px-3 pt-2">
                    <div className="d-flex align-items-center">
                        <p className="card-text text-muted fs-10">{Icons.like("fs-14 me-1")} {post.likes.length} people liked this post</p>
                    </div>
                    <div className="row row-cols-2 border-top mt-2 py-2">

                        <Button
                            res={postFollowRes}
                            overrideButtonClass={`rounded-0 col border-0 d-flex align-items-center justify-content-center bg-white text-primary`}
                            onClick={() => handleFollowClick(post.astroId, isFollowed)}
                        >
                            {isFollowed ? (
                                <>
                                    {Icons.followed("me-2")} Followed
                                </>
                            ) : (
                                <>
                                    {Icons.notFollowed("me-2")} Follow
                                </>
                            )}
                        </Button>
                        <Button
                            res={postLikeRes}
                            overrideButtonClass={`rounded-0 col border-0 d-flex align-items-center justify-content-center bg-white text-primary`}
                            onClick={() => handleLikeClick(post.id, isLiked)}
                        >
                            {isLiked ? (
                                <>
                                    {Icons.liked("me-2")} Liked
                                </>
                            ) : (
                                <>
                                    {Icons.notLiked("me-2")} Like
                                </>
                            )}
                        </Button>
                    </div>

                </div>
            </div >
        </div >
    );
};

export default PostCard;

