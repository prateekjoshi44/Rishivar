import { ImAttachment } from "react-icons/im";
import { MdOutlineFileDownload } from "react-icons/md";
import PageLoading from "../components/PageLoading";
import ApiErrorModal from "../components/modal/ApiErrorModal";
import AttachModal from "../components/modal/AttachModal";
import Button from "../components/form/Button";
import { useParams } from "react-router";
import { useEffect } from "react";
import { usePostMessageMutation } from "../services/chatSlice";
import { usePostUploadMutation } from "../services/uploadSlice";
import Icons from "../components/ui/Icons";

const ViewChat = ({ chatRes, refetch }) => {
  const { id } = useParams();
  const [postChat, postChatRes] = usePostMessageMutation();
  const [postUpload, postUploadRes] = usePostUploadMutation();


  const onSubmit = async (event) => {
    try {
      event.preventDefault();
      const form = event.target;

      if (form.checkValidity()) {
        let uploadRes;
        let body = {};
        if (form["upload"].files.length > 0) {
          const uploadBody = new FormData();
          uploadBody.append("upload", form["upload"].files[0]);
          uploadRes = await postUpload(uploadBody);
          if (uploadRes.error) {
            console.error("Upload error:", uploadRes.error);
            return;
          }
          body.uploadId = uploadRes.data.id;
        }

        body.message = form["message"]?.value;
        body.chatId = id;

        const res = await postChat(body);
        if (res.error) {
          console.error("Post chat error:", res.error);
        } else {
          form.reset();
          chatRes.refetch();
        }
      } else {
        form.classList.add("was-validated");
      }
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  const renderUpload = ({ name }) => (
    <div className="mt-3 p-2 bg-white border rounded-3 shadow-sm text-primary d-flex align-items-center">
      <ImAttachment className="me-2" />
      {name}
      <MdOutlineFileDownload className="text-dark border ms-auto fs-4" />
    </div>
  );

  const renderChat = ({
    id: chatId,
    message,
    // user,
    astro,
    // createdAt,
    upload,
  }) =>

    astro ? (
      <div className="container" key={chatId}>

        <div className="d-flex align-items-center mb-1 justify-content-start ">
          <div className="bg-warning  rounded-pill p-2 p-lg-3 me-1 me-lg-3 d-flex justify-content-between">
            <div className="">
              {message}
              {upload && renderUpload(upload)}
              {/* <div style={{ fontSize: "13px" }}>
                    {astro.name} - {formatDate(createdAt)}
                  </div> */}

              {/* <ProfilePicture
                name={astro?.name}
                picture={astro?.picture}
                size={30}
              /> */}
            </div>
          </div>
        </div>
      </div>
    ) : (

      <div className="container" key={chatId}>
        {/* <div className="text-start" style={{ fontSize: "13px" }}>
            {user.name} - {formatDate(createdAt)}
          </div> */}
        <div className=" d-flex justify-content-end align-items-center mb-1   ">

          <div className="bg-primary rounded-pill p-2 text-white p-lg-3 me-1 ms-lg-3 fs-12">
            {message}


          </div>
        </div>
      </div>
    );

  useEffect(() => {
    if (chatRes.data) {
      const div = document.getElementById("chatsDiv");
      div.scrollTop = div.scrollHeight;
    }
  }, [chatRes?.data?.chats]);

  useEffect(() => {
    if (chatRes.data) {
      const form = document.getElementById("chatForm");
      form.reset();
    }
  }, [id]);

  if (chatRes.isLoading) return <PageLoading />;
  if (chatRes.isError) return <ApiErrorModal res={chatRes} />;
  if (postUploadRes.isLoading) return <PageLoading />;
  if (postUploadRes.isError) return <ApiErrorModal res={postUploadRes} />;

  const chat = chatRes?.data;

  return (
    <div className="h-100 d-flex flex-column">
      {postChatRes.isError && <ApiErrorModal res={postChatRes} />}
      <div className="flex-grow-1 overflow-hidden">
        <div
          id="chatsDiv"
          className="px-3 px-lg-5 py-3 d-flex flex-column overflow-y-auto h-100"
        >
          {chat.chatItems?.map(renderChat)}
        </div>
      </div>
      <form
        id="chatForm"
        onSubmit={onSubmit}
        className="px-2 px-lg-5 py-3  d-flex g-3 align-items-center"
        noValidate
      >

        <div className="bg-white rounded-pill w-100 p-2 shadow-sm d-flex justify-content-between ">
          <AttachModal name={"upload"} />

          {/* <Input
            textArea
            containerClass={""}
            name={"message"}
            noLabel
            required
          /> */}

          <input

            className=" w-75 border-0"
            name="message"
            id="message"
            placeholder="Message Here.."
          />
          <Button
            className="d-none d-lg-block btn-primary px-0 shadow-sm rounded-pill ms-3"
            loadingLabel="Posting"
            res={postChatRes}
            refetch={refetch}
          >
            Post
            {Icons.send("ms-2")}
          </Button>
          <div
            className="ms-2"
            style={{
              borderRadius: "50%",
              overflow: "hidden",
              width: 35,
              height: 35,
            }}
          >
            <Button
              className="d-lg-none flex-center p-0 btn-warning shadow-sm rounded-circle"
              noLabel
              res={postChatRes}
              style={{ borderRadius: "50%", width: 35, height: 35 }}
            >
              {Icons.send("")}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ViewChat;
