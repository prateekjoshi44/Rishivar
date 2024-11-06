import {
  useGetProfileQuery,
  usePatchProfileMutation,
} from "../../services/profileSlice";
import ApiErrorModal from "./ApiErrorModal";
import PageLoading from "../PageLoading";
import Button from "../form/Button";
import Input from "../form/Input";
import { usePostUploadMutation } from "../../services/uploadSlice";
import ProfilePictureInput from "../form/ProfilePictureInput";

const UpdateUserDetailModal = () => {
  const modalId = "UpdateUserDetailModal";

  const profileRes = useGetProfileQuery();
  const [patchProfile, patchProfileRes] = usePatchProfileMutation();
  const [uploadImage, uploadImageRes] = usePostUploadMutation();

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      const form = e.target;
      if (form.checkValidity()) {
        const name = form["name"].value;
        const dob = form["dob"].value;
        const occupation = form["occupation"].value;
        const placeOfBirth = form["placeOfBirth"].value;
        const phone = form["phone"].value;

        let uploadId = undefined;
        if (form["profile picture"].files.length === 1) {
          const file = form["profile picture"].files[0];
          const uploadBody = new FormData();
          uploadBody.append("upload", file);

          const res = await uploadImage(uploadBody);
          if (res.error) throw new Error("message");
          uploadId = res.data.id;
        }

        const body = {
          name,
          dob,
          occupation,
          placeOfBirth,
          phone,
          ...(uploadId && { uploadId }),
        };

        await patchProfile(body);
      } else {
        form.classList.add("was-validated");
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (profileRes.isLoading) return <PageLoading />;
  if (profileRes.isError) return <ApiErrorModal res={profileRes} />;

  if (uploadImageRes.isLoading) return <PageLoading />;
  if (uploadImageRes.isError) return <ApiErrorModal res={uploadImageRes} />;

  const user = profileRes.data;

  return (
    <div>
      {/* <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button> */}

      <div
        className="modal fade"
        id={modalId}
        tabIndex="-1"
        aria-labelledby={modalId + "Label"}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content rounded-5 p-0 overflow-hidden ">
            <div className="modal-header d-flex justify-content-center w-100 bg-danger text-white ">
              <h1 className="modal-title  fs-5 fw-bold" id="exampleModalLabel">
                Update Profile
              </h1>
              {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
            </div>
            <form className="modal-body" onSubmit={onSubmit} noValidate>
              <div className="container  p-4">
                <div className="col d-flex justify-content-center">
                  <ProfilePictureInput
                    placeHolder={profileRes.isLoading}
                    name="profilePicture"
                    defaultValue={user?.userPicture?.src}
                  />
                </div>
                <div className="row row-cols-1 g-3 mb-3">
                  <Input name="name" defaultValue={user.name} required />
                  {/* <Input name="profile picture" type="file" required /> */}
                  <Input
                    name="phone"
                    type="number"
                    defaultValue={user.phone}
                    required
                  />
                  <Input
                    name="dob"
                    type="date"
                    defaultValue={user.dob}
                    required
                  />
                  <Input name="Time of Birth" type="time" required />
                  <Input
                    name="occupation"
                    type="text"
                    defaultValue={user.occuptaion}
                    required
                  />
                  <Input
                    name="placeOfBirth"
                    type="text"
                    defaultValue={user.placeOfBirth}
                    required
                  />
                </div>
                <div className=" text-end">
                  <Button
                    data-bs-dismiss="modal"
                    className={"rounded-pill shadow"}
                    type={"Submit"}
                    res={patchProfileRes}
                  >
                    Update Profile
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserDetailModal;
