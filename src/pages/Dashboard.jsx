

import PageLoading from "../components/PageLoading";
import ApiErrorModal from "../components/modal/ApiErrorModal";
import { useGetProfileQuery } from "../services/profileSlice";
import HeroSlider from "../components/HeroSlider";

import group from '../assets/images/home/Group.png';
import { useGetAstrosQuery } from '../services/astroSlice';
import AstroSlider from '../components/AstroSlider';

import CategoriesSlider from '../components/CategoriesSlider';

function Dashboard() {
  const profileRes = useGetProfileQuery();
  const response = useGetAstrosQuery();


  if (response.isLoading) return <></>
  if (response.isError) return <ApiErrorModal res={response} />;

  let data = [...response.data];

  if (profileRes.isLoading) return <PageLoading />;
  if (profileRes.isError) return <ApiErrorModal res={profileRes} />;


  const chatAstros = data.filter(astro => astro.chatAvailabilityStatus === 'Online');
  const audioCallAstros = data.filter(astro => astro.audioCallAvailabilityStatus === 'Online');
  const videoCallAstros = data.filter(astro => astro.videoCallAvailabilityStatus === 'Online');


  return (
    <div className="h-100 overflow-y-auto mt-5   ">
      <HeroSlider />

      <div className='text-warning text-center fs-12 fw-medium  mx-3'>Want to Know About Something Fast?</div>

      <div
        className=" my-3 mx-auto"
        style={{
          borderTop: "2px solid #FE6A0E",
          width: `15%`,
        }}
      />

      <CategoriesSlider />


      <div className="mx-3 py-2 my-4"><img className='w-100' src={group} alt="" /></div>

      <div className="" >
        <p className='text-start mx-3 fw-semibold mont '>Astrologers available for Chat</p>
        {chatAstros.length > 0 ? <AstroSlider astros={chatAstros} mode="Chat" /> : <p className='text-center'>No astrologers available for chat.</p>}
      </div>

      <div className="">
        <p className='text-start mx-3 fw-semibold mont'>Astrologers available for Audio Call</p>
        {audioCallAstros.length > 0 ? <AstroSlider astros={audioCallAstros} mode="AudioCall" /> : <p className='text-center'>No astrologers available for audio call.</p>}
      </div>

      <div className="">
        <p className='text-start mx-3 fw-semibold mont'>Astrologers available for Video Call</p>
        {videoCallAstros.length > 0 ? <AstroSlider astros={videoCallAstros} mode="VideoCall" /> : <p className='text-center'>No astrologers available for video call.</p>}
      </div>
    </div>
  );



}

export default Dashboard;
