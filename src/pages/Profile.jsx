import ProfilePicture from '../components/ProfilePicture';
import { useGetProfileQuery } from '../services/profileSlice';
import { BsFilePost } from 'react-icons/bs';
import { FaUserEdit } from 'react-icons/fa';
import ApiErrorModal from '../components/modal/ApiErrorModal';
import { useDispatch } from 'react-redux';
import { setAuthData } from '../redux/authSlice';
import { Link } from 'react-router-dom';
import Page from '../layout/Page';
import Icons from '../components/ui/Icons';
import img from "../assets/images/astroImg.png"
const Profile = () => {

  const dispatch = useDispatch();
  const profileRes = useGetProfileQuery();

  const Links = [
    // { text: "My Wallet", to: "/", icon: Icons.wallet() },
    { text: "My Astrologers", to: "/Order", icon: Icons.astro() },
    { text: "My Consultation", to: "/Order", icon: Icons.consulatant() },
    { text: "Help & Support", to: "/HelpAndSupport", icon: Icons.support() },
    { text: "Feedback", to: "/Feedback", icon: Icons.feedback() },
    { text: "Rate us on Play Store/IOS", to: "/RateUs", icon: Icons.rateUs() },
    { text: "Terms & Condition", to: "/TermsAndConditions", icon: Icons.termsAndConditions() },
    { text: "Privacy Policy", to: "/PrivacyPolicy", icon: Icons.privacyPolicy() },
    { text: "Delete my account", to: "/", icon: Icons.deleteAccount() },
  ];

  if (profileRes.isLoading) return (
    <div className='mx-3 '>
      <div className="d-flex justify-content-center align-items-center mb-4 placeholder-glow mb-3">
        <div className="placeholder-glow">
          <div style={{ height: 150, width: 150 }} className="placeholder rounded-pill ms-3" >
          </div>
        </div>
      </div>
      <div className="mb-4 placeholder-glow mb-5">
        <div className="bg-white p-3 rounded shadow d-flex placeholder">
          <div className='flex-grow-1 '>
            <p>Name: </p>
            <p>Date of Birth:</p>
            <p>Time of Birth:</p>
            <p>Place of Birth: </p>
            <p>Occupation:</p>
          </div>
          <div >
            <FaUserEdit style={{ width: 30, height: 30 }} />
          </div>
        </div>
      </div>
      <div className="row row-cols-2 g-4 ">
        {Array.from({ length: 2 }).map((index) => (
          <div className="col " key={index} >
            <div className="card bg-white shadow text-decoration-none ">
              <div style={{ width: '100%', height: '100px' }} className='placeholder-glow'>
                <div className="placeholder-glow w-100 h-100 d-flex flex-column justify-content-center align-items-center">
                  <BsFilePost className='fs-5 placeholder my-2 ' />
                  <p className='placeholder col-6'>Orders</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (profileRes.isError) return <ApiErrorModal res={profileRes} />;

  const user = profileRes.data;

  const birthDate = new Date(user?.dob);
  const currentDate = new Date();

  let age = currentDate.getFullYear() - birthDate.getFullYear();
  const monthDifference = currentDate.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
    age--;
  }

  return (
    <Page className="container mt-4">


      <div className="mt-4 mb-4">
        <div className=" bg-white p-3 rounded-4 shadow d-flex">

          <div className="d-flex  justify-content-center align-items-center  ">
            {
              user?.userPicture &&
              <ProfilePicture imgClass="rounded-4" placeHolder={profileRes.isLoading} picture={user?.userPicture?.src || img} name="prateek" size={100} />
            }
          </div>
          <div className=" d-flex flex-column justify-content-center">

            <div className=' mx-3 fw-semibold mb-2'>
              {Icons.user("me-2")}
              {user?.name}, {age}
            </div>

            <div className='ms-3 ' >

              <Link to="./EditProfile" className="text-primary text-decoration-none d-flex align-items-center">
                {Icons.edit("me-2")} Click to Edit
              </Link>

              <div className="" style={{ height: 2, width: 110, borderTop: "1px solid #fe6a0e", }} />
            </div>
          </div>
        </div>
      </div>

      <div className="w-50   mx-auto mb-3 " style={{ height: 2, borderTop: "1px solid #FFA400", }} />

      <div className="ms-2 mb-2 ">

        <div className="pb-2" >
          <Link to="/Wallet" className="    rounded shadow text-decoration-none ">
            <div className="d-flex border shadow-sm px-2 bg-white justify-content-between text-center py-2 rounded-3 ">
              <div className="d-flex  ">
                <h5 className="text-dark items-start me-2">{Icons.wallet()}</h5>
                <p className="text-dark">My Wallet</p>
              </div>
              <div className="text-dark">₹ {profileRes.data.balance}</div>
            </div>
          </Link>
        </div>

        {Links.map(a => (
          <div className="pb-2" key={a.text}>
            <Link to={a.to} className=" bg-white shadow text-decoration-none ">
              <div className="d-flex px-2 text-center py-2 rounded-3 ">
                <h5 className="text-dark items-start me-2">{a.icon}</h5>
                <p className="text-dark">{a.text}</p>
              </div>
            </Link>
          </div>
        ))}


      </div>

      <div className=" d-flex  justify-content-center mb-2">
        <div className="w-50 mb-2 " style={{ height: 2, borderTop: "1px solid #FFA400", }} />

      </div>

      <div className="bg-white border rounded-3 mx-3 py-2 shadow-sm d-flex justify-content-center align-items-center" onClick={() => { dispatch(setAuthData(null)) }}>
        {Icons.logout("me-2 my-2")}
        Sign Out
      </div>


    </Page>
  );
}

export default Profile;
