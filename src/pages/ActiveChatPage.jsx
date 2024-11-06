import {
  useGetChatQuery,
  usePatchChatMutation,
} from "../services/chatSlice";
import Button from "../components/form/Button";
import PageLoading from "../components/PageLoading";
import Timer from "../components/Timer";
import { useNavigate, useParams } from "react-router-dom";
import ApiErrorModal from "../components/modal/ApiErrorModal";
import ViewChat from "./ViewChat";
import "../assets/css/timer.css";
import { useEffect } from "react";

const ActiveChatPage = () => {

  const { id } = useParams();
  const chatRes = useGetChatQuery(id);
  const navigate = useNavigate();
  const [patchChatStatus, patchChatStatusRes] = usePatchChatMutation();

  const handleChat = async (status) => {
    const res = await patchChatStatus({ id, status });
    if (res.data) navigate("/");
  };

  useEffect(() => {
    chatRes.refetch()
  }, [])

  if (chatRes.isLoading) return <PageLoading />;
  if (chatRes.isError) return <ApiErrorModal res={chatRes} />;
  const chat = chatRes.data;

  if (chat.status === "Completed") {
    navigate("/");
    return <></>;
  }

  return (
    <>

      {chat.status === "Active" && (
        <div className="h-100 d-flex justify-content-center flex-column ">
          {/* <FullScreenMode /> */}
          <div className=" d-flex justify-content-between align-items-center px-4 mt-1 py-2  border-bottom-0 shadow ">
            <Timer endTime={chat.timeout} />
            <div className="end-chat">
              <Button
                type="button"
                res={patchChatStatusRes}
                data-bs-dismiss="modal"
                onClick={() => handleChat("Completed")}
                color={"success"}
              >
                End Chat
              </Button>
            </div>
          </div>

          <div className="flex-grow-1 overflow-hidden">
            <ViewChat chatRes={chatRes} refetch={chatRes.refetch} />
          </div>
        </div>
      )}
    </>
  );
};

export default ActiveChatPage;
