import { useEffect, useState, useRef } from "react";
import { useGetCallQuery, usePatchCallMutation } from "../services/callSlice";
import Button from "../components/form/Button";
import PageLoading from "../components/PageLoading";
import Timer from "../components/Timer";
import { useNavigate, useParams } from "react-router-dom";
import ApiErrorModal from "../components/modal/ApiErrorModal";
import VideoCall from "../webrtc/VideoCall";
import AudioCall from "../webrtc/AudioCall";

const ActiveCallPage = () => {
  const { id } = useParams();

  const callRes = useGetCallQuery(id);

  const navigate = useNavigate();
  const [patchCallStatus, patchCallStatusRes] = usePatchCallMutation();
  const [audioOutputDevices, setAudioOutputDevices] = useState([]);
  const [selectedAudioOutput, setSelectedAudioOutput] = useState("");
  const remoteVideoRef = useRef();

  const handleCall = async (status) => {
    const res = await patchCallStatus({ id, status });
    if (res.data) navigate("/");
  };



  useEffect(() => {
    if (call.status === "Completed") navigate("/");
  }, [call.status]);

  useEffect(() => {
    // Enumerate audio output devices
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const audioOutputs = devices.filter(
        (device) => device.kind === "audiooutput"
      );
      setAudioOutputDevices(audioOutputs);
      if (audioOutputs.length > 0) {
        setSelectedAudioOutput(audioOutputs[0].deviceId);
      }
    });
  }, []);

  const handleAudioOutputChange = (event) => {
    const deviceId = event.target.value;
    setSelectedAudioOutput(deviceId);
    if (remoteVideoRef.current && remoteVideoRef.current.setSinkId) {
      remoteVideoRef.current.setSinkId(deviceId).catch((error) => {
        console.error("Error setting audio output device", error);
      });
    } else {
      console.warn("Browser does not support audio output device selection.");
    }
  };

  if (callRes.isLoading) return <PageLoading />;
  if (callRes.isError) return <ApiErrorModal res={callRes} />;

  const call = callRes.data;

  if (call.status === "Completed") {
    navigate("/");
    return <></>;
  }

  return (
    <>
      {call.status === "Active" && (
        <div className="position-relative w-100 h-100 overflow-hidden">
          <div className="">
            <div
              className="position-absolute top-0 start-0 end-0 d-flex align-items-center p-3"
              style={{ zIndex: 10, backgroundColor: "rgba(0, 0, 0, 0)" }}
            >
              <Timer endTime={call.timeout} />
              <div className="mx-5 ">
                <Button
                  className={"py-2"}
                  type="button"
                  res={patchCallStatusRes}
                  data-bs-dismiss="modal"
                  onClick={() => handleCall("Completed")}
                  color={"danger"}
                >
                  EndCall
                </Button>
              </div>
              <div className="d-flex flex-column align-items-end ">
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
              </div>
            </div>
          </div>
          {call.type === "AudioCall" ? (
            <AudioCall />
          ) : (
            <VideoCall remoteVideoRef={remoteVideoRef} />
          )}
        </div>
      )}
    </>
  );
};

export default ActiveCallPage;
