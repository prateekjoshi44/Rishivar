import { useEffect } from "react";
import {
  useGetCallQuery,
  usePatchCallMutation,
} from "../../services/callSlice";
import Button from "../../components/form/Button";
import PageLoading from "../../components/PageLoading";
import { useNavigate, useParams } from "react-router-dom";
import ApiErrorModal from "../../components/modal/ApiErrorModal";
import AudioCall from "../../webrtc/AudioCall";
import { MdCallEnd } from "react-icons/md";

const ActiveAudioCallPage = () => {
  const { id } = useParams();

  const callRes = useGetCallQuery(id);

  const navigate = useNavigate();
  const [patchCallStatus, patchCallStatusRes] = usePatchCallMutation();
  // const [audioOutputDevices, setAudioOutputDevices] = useState([]);
  // const [selectedAudioOutput, setSelectedAudioOutput] = useState("");
  // const remoteVideoRef = useRef();

  useEffect(() => {
    if (callRes.data?.status === "Completed") navigate("/");
  }, [callRes?.data, callRes?.data?.status]);

  // useEffect(() => {
  //   // Enumerate audio output devices
  //   navigator.mediaDevices.enumerateDevices().then((devices) => {
  //     const audioOutputs = devices.filter(
  //       (device) => device.kind === "audiooutput"
  //     );
  //     setAudioOutputDevices(audioOutputs);
  //     if (audioOutputs.length > 0) {
  //       setSelectedAudioOutput(audioOutputs[0].deviceId);
  //     }
  //   });
  // }, []);

  const handleCall = async (status) => {
    const res = await patchCallStatus({ id, status });
    if (res.data) navigate("/");
  };

  if (callRes.isLoading) return <PageLoading />;
  if (callRes.isError) return <ApiErrorModal res={callRes} />;

  const call = callRes.data;

  if (call.status === "Completed") {
    navigate("/");
    return <></>;
  }



  // const handleAudioOutputChange = (event) => {
  //   const deviceId = event.target.value;
  //   setSelectedAudioOutput(deviceId);
  //   if (remoteVideoRef.current && remoteVideoRef.current.setSinkId) {
  //     remoteVideoRef.current.setSinkId(deviceId).catch((error) => {
  //       console.error("Error setting audio output device", error);
  //     });
  //   } else {
  //     console.warn("Browser does not support audio output device selection.");
  //   }
  // };

  return (
    <>
      {call.status === "Active" && (
        <div className="position-relative w-100 h-100 overflow-hidden">
          <div className="d-flex flex-column mt-5">
            <AudioCall />
            <div
              className=" d-flex flex-column  mt-5 align-items-center p-3 "
              style={{ zIndex: 10, backgroundColor: "rgba(0, 0, 0, 0)" }}
            >
              {/* <TimerV1
                className={"mx-5 mb-3 w-100 fs-5"}
                endTime={call.timeout}
              /> */}

              {/* <div className="d-flex flex-column align-items-end my-3">
                <label htmlFor="audioOutput"></label>
                <select
                  id="audioOutput"
                  value={selectedAudioOutput}
                  onChange={handleAudioOutputChange}
                  className="form-select"
                >
                  {audioOutputDevices.map((device) => (
                    <option key={device.deviceId} value={device.deviceId}>
                      {device.label || `Speaker ${device.deviceId}`}
                    </option>
                  ))}
                </select>
              </div> */}
              <div className="mx-5 mt-3 ">
                <Button
                  className={
                    "py-2 rounded-circle border-danger bg-opacity-50 border-5"
                  }
                  type="button"
                  res={patchCallStatusRes}
                  data-bs-dismiss="modal"
                  onClick={() => handleCall("Completed")}
                  color={"white"}
                  icon
                >
                  <MdCallEnd
                    className="   "
                    style={{
                      fontSize: 30,
                      marginLeft: 10,
                      marginRight: 10,
                      marginBottom: 13,
                      marginTop: 13,
                    }}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ActiveAudioCallPage;
