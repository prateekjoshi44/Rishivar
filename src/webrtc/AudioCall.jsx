import { useEffect, useRef } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import Api from "../constants/Api";
import { useSelector } from "react-redux";
import { useGetAstroQuery } from "../services/astroSlice";
import ApiErrorModal from "../components/modal/ApiErrorModal";
import PageLoading from "../components/PageLoading";
import { useGetCallQuery } from "../services/callSlice";
import ProfilePicture from "../components/ProfilePicture";

const AudioCall = () => {
  const userType = "User";
  const token = useSelector((state) => state.auth.authToken);
  const { id: callId } = useParams();
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);

  const localVideoRef = useRef();
  const remoteVideoRef = useRef();
  const socket = useRef(null);
  const peerConnection = useRef(null);
  const callRes = useGetCallQuery(callId);
  const astro = useGetAstroQuery(callRes?.data.astro.id);
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
          video: false,
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

    return () => {
      // Clean up the peer connection
      if (peerConnection.current) {
        peerConnection.current.onicecandidate = null;
        peerConnection.current.ontrack = null;
        peerConnection.current.close();
        peerConnection.current = null;
      }

      // Stop the local stream and its tracks (audio included)
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

  if (astro.isLoading) return <PageLoading />;
  if (astro.isError) return <ApiErrorModal res={astro} />;

  const { name } = astro.data;

  return (
    <div>
      <h1></h1>
      <div className=" flex flex-col justify-content-center overflow-scroll">
        <div className=" text-center ">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            style={{ width: "30px" }}
          ></video>
        </div>
        <div className="text-center ">
          <video
            ref={remoteVideoRef}
            autoPlay
            style={{ width: "30px" }}
          ></video>
          <div className="col  d-flex  justify-content-center  ">
            <ProfilePicture
              picture={astro.currentData?.astroPicture?.src}
              name="profilePicture "
              size={150}
            />
          </div>
          <div className="col    flex-grow-1">
            <p className="mt-4 bold h2">{name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioCall;
