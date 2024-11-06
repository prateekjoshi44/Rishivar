import { useNavigate, useParams } from 'react-router-dom'
import Button from './form/Button'
import { usePostCallMutation } from '../services/callSlice'
import { usePostChatMutation } from '../services/chatSlice'
import Spinner from './Spinner'
import { useGetAstroQuery } from '../services/astroSlice'
import { useGetProfileQuery } from '../services/profileSlice'
import { IoCall, IoChatbox } from 'react-icons/io5'
import ApiErrorModal from './modal/ApiErrorModal'
import PageLoading from './PageLoading'
import SuccessModal from './modal/SuccessModal'
import Icons from './ui/Icons'

const CheckBalanceModal = ({ type }) => {

  const { id } = useParams()
  const astroRes = useGetAstroQuery(id)
  const userProfileRes = useGetProfileQuery()
  const [postCall, postCallRes] = usePostCallMutation();
  const [postChat, postChatRes] = usePostChatMutation();

  const btnId = type + "Button";
  const navigate = useNavigate()



  const handleChat = async () => {
    try {
      await postChat({ astroId: id })
    }
    catch (err) {
      console.log(err)
    }

  }

  const handleCall = async (type) => {
    try {
      await postCall({ astroId: id, type })
    }
    catch (err) {
      console.log(err)
    }

  }


  if (astroRes.isLoading || userProfileRes.isLoading) return <PageLoading />
  if (astroRes.isError) return <ApiErrorModal res={astroRes} />
  if (userProfileRes.isError) return <ApiErrorModal res={userProfileRes} />

  const user = userProfileRes.data
  const astro = astroRes.data
  const { chatPrice, audioCallPrice, videoCallPrice, chatAvailabilityStatus, audioCallAvailabilityStatus, videoCallAvailabilityStatus } = astro

  const price = type === "Chat" ? chatPrice : type === "AudioCall" ? audioCallPrice : videoCallPrice
  const status = type === "Chat" ? chatAvailabilityStatus : type === "AudioCall" ? audioCallAvailabilityStatus : videoCallAvailabilityStatus
  const maxTime = Math.floor(user.balance / price)

  return (
    <>
      {/* {
        postCallRes.isSuccess &&
        <div className="alert alert-success d-flex align-items-center justify-content-center" role="alert">
          <svg className="bi flex-shrink-0 me-2" role="img" aria-label="Success:"><use xlinkHref="#check-circle-fill" /></svg>
          <div>
            Call is Created Sucesfully! Hold your breath till Astro Accepts it...
          </div>
        </div>
      } */}

      {postCallRes.isSuccess && (
        <SuccessModal message={"Call has been made"} />
      )}

      {/* {
        postChatRes.isSuccess &&
        <div className="alert alert-success d-flex align-items-center" role="alert">
          <svg className="bi flex-shrink-0 me-2" role="img" aria-label="Success:"><use xlinkHref="#check-circle-fill" /></svg>
          <div>
            Chat is Created Sucesfully! Hold your breath till Astro Accepts it...
          </div>
        </div>
      } */}
      {postChatRes.isSuccess && (
        <SuccessModal message={"Chat has been made"} />
      )}

      {postCallRes.isError && <ApiErrorModal res={postCallRes} />}
      {postChatRes.isError && <ApiErrorModal res={postChatRes} />}


      <button
        type="button"
        className={`btn d-flex justify-content-center align-items-center btn-sm  fs-15 rounded-pill btn-${status ?
          (type === "Chat" ? "success" :
            type === "AudioCall" ? "danger" :
              type === "VideoCall" ? "success" : "secondary")
          : "dark"} w-100`}
        disabled={!status}
        id={btnId}
        data-bs-toggle="modal"
        data-bs-target={"#" + type}
      >
        {type === "Chat" && Icons.message("fs-5 me-1")}
        {type === "AudioCall" && Icons.phoneCall("fs-5 me-1")}
        {type === "VideoCall" && Icons.videoCall(" fs-5 me-1")}
        ₹{price}/m
      </button>

      <div className="modal fade z-5" id={type} tabIndex="-1" aria-labelledby={type + "Label"} aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content rounded-5 p-0">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">{astro.name}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {
                postChatRes.isLoading || postCallRes.isLoading ?
                  <Spinner />
                  :
                  <div>
                    {type === "AudioCall" &&
                      <>
                        <h2>Talk With: {astro.name}</h2>
                        <div>Call Price: ₹ {astro.audioCallPrice}/min</div>
                        <h3>Your Balance: {user.balance}</h3>
                        <p>Maximum Call Time: {maxTime} minutes</p>
                        {(user.balance / astro.audioCallPrice) >= 5 ?
                          <div className="btn w-100 btn-primary text-center rounded-pill px-4" data-bs-dismiss="modal" onClick={() => handleCall("AudioCall")}>Call
                            <span className="ps-2"><IoCall /></span>
                          </div>

                          :
                          <>
                            <div>Your balance is not enough!! Please Recharge</div>
                            <Button onClick={() => navigate("/Wallet")} > Recharge</Button>
                          </>
                        }
                      </>

                    }
                    {type === "VideoCall" &&
                      <>
                        <h2>Talk With: {astro.name}</h2>
                        <div>Call Price: ₹ {astro.videoCallPrice}/min</div>
                        <h3>Your Balance: {user.balance}</h3>
                        <p>Maximum Call Time: {maxTime} minutes</p>
                        {(user.balance / astro.videoCallPrice) >= 5 ?
                          <div className="btn w-100 btn-primary text-center rounded-pill px-4" data-bs-dismiss="modal" onClick={() => handleCall("VideoCall")}>Call
                            <span className="ps-2"><IoCall /></span>
                          </div>

                          :
                          <>
                            <div>Your balance is not enough!! Please Recharge</div>
                            <Button onClick={() => navigate("/Wallet")} > Recharge</Button>
                          </>
                        }
                      </>

                    }

                    {type === "Chat" &&
                      <>
                        <h2>Chat With: {astro.name}</h2>
                        <div>Chat Price: ₹ {astro.chatPrice}/min</div>
                        <h3>Your Balance: ₹ {user.balance}</h3>
                        <p>Maximum chat Time: {maxTime} minutes</p>

                        {(user.balance / astro.chatPrice) >= 5 ?
                          <div className="btn w-100 btn-primary text-center rounded-pill px-4" data-bs-dismiss="modal" onClick={handleChat}>Chat
                            <span className="ps-2"><IoChatbox /></span>
                          </div>

                          :
                          <>
                            <div>Your balance is not enough!! Please Recharge</div>
                            <Button onClick={() => navigate("/Wallet")} > Recharge</Button>
                          </>
                        }
                      </>

                    }



                  </div>

              }


            </div>

          </div>
        </div>
      </div>
    </>
  )
}

export default CheckBalanceModal