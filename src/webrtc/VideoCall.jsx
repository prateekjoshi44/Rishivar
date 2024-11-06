import { useEffect, useRef } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import Api from "../constants/Api";
import { useSelector } from "react-redux";

const VideoCall = () => {
  const userType = "User";
  const token = useSelector((state) => state.auth.authToken);
  const { id: callId } = useParams();

  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);

  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const socket = useRef(null);
  const peerConnection = useRef(null);
  // const [audioOutputDevices, setAudioOutputDevices] = useState([]);
  // const [selectedAudioOutput, setSelectedAudioOutput] = useState("");

  const servers = {
    iceServers: [
      {
        urls: "stun:stun.l.google.com:19302",
      },
    ],
  };

  useEffect(() => {
    socket.current = io(Api.RISHIVAR_BACKEND_URL, {
      auth: {
        token,
        type: userType,
        callId,
      },
    });

    socket.current.on("connect", async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        localStreamRef.current = stream;
        localVideoRef.current.srcObject = stream;

        peerConnection.current = new RTCPeerConnection(servers);
        peerConnection.current.onicecandidate = handleICECandidateEvent;
        peerConnection.current.ontrack = handleTrackEvent;

        stream
          .getTracks()
          .forEach((track) => peerConnection.current.addTrack(track, stream));

        if (userType === "User") {
          const offer = await peerConnection.current.createOffer();
          await peerConnection.current.setLocalDescription(offer);
          socket.current.emit("call-user", { callId, offer });
        }
      } catch (error) {
        console.error("Error accessing media devices.", error);
      }
    });

    socket.current.on("receive-offer", async (data) => {
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(data.offer)
      );
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(answer);
      socket.current.emit("answer-call", { callId, answer });
    });

    socket.current.on("call-answered", async (data) => {
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(data.answer)
      );
    });

    socket.current.on("ice-candidate", async (data) => {
      if (data.candidate) {
        try {
          await peerConnection.current.addIceCandidate(
            new RTCIceCandidate(data.candidate)
          );
        } catch (e) {
          console.error("Error adding received ice candidate", e);
        }
      }
    });

    // Enumerate audio output devices
    navigator.mediaDevices.enumerateDevices().then((devices) => {
      const audioOutputs = devices.filter(
        (device) => device.kind === "audiooutput"
      );
      // setAudioOutputDevices(audioOutputs);
      if (audioOutputs.length > 0) {
        // setSelectedAudioOutput(audioOutputs[0].deviceId);
      }
    });

    return () => {
      // Clean up the peer connection
      if (peerConnection.current) {
        peerConnection.current.onicecandidate = null;
        peerConnection.current.ontrack = null;
        peerConnection.current.close();
        peerConnection.current = null;
      }

      // Stop the local stream
      if (localStreamRef.current) {
        localStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      // Disconnect the socket
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [callId, token, userType]);

  const handleICECandidateEvent = (event) => {
    if (event.candidate) {
      socket.current.emit("ice-candidate", {
        callId,
        candidate: event.candidate,
      });
    }
  };

  const handleTrackEvent = (event) => {
    remoteStreamRef.current = event.streams[0];
    remoteVideoRef.current.srcObject = event.streams[0];
  };

  // const handleAudioOutputChange = (event) => {
  //   const deviceId = event.target.value;
  //   setSelectedAudioOutput(deviceId);
  //   if (remoteVideoRef.current.setSinkId) {
  //     remoteVideoRef.current.setSinkId(deviceId).catch((error) => {
  //       console.error("Error setting audio output device", error);
  //     });
  //   } else {
  //     console.warn("Browser does not support audio output device selection.");
  //   }
  // };

  return (
    <div className="position-relative w-100 h-100 z-12 shadow-lg">
      <div
        className="position-absolute top-0 end-0 m-3 rounded-4 overflow-hidden"
        style={{ width: "150px", height: "200px" }}
      >
        <video
          ref={localVideoRef}
          autoPlay
          muted
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
        ></video>
      </div>
      <div className="w-100 h-100 z-0">
        <video
          ref={remoteVideoRef}
          autoPlay
          className="w-100 h-100"
          style={{ objectFit: "cover" }}
        ></video>
      </div>
    </div>
  );
};

export default VideoCall;
