import { useEffect } from 'react';
import { useGetProfileQuery, usePatchProfileMutation } from '../services/profileSlice';
import Page from '../layout/Page';
import Icons from '../components/ui/Icons';
import Input from '../components/form/Input';
import ApiErrorModal from '../components/modal/ApiErrorModal';
import SuccessModal from '../components/modal/SuccessModal';
import ProfilePictureInput from '../components/form/ProfilePictureInput';
import DateInput from '../components/form/DateInput';
import GenderInput from '../components/form/GenderInput';

const EditProfile = () => {
    const [patchUser, patchUserRes] = usePatchProfileMutation();
    const profileRes = useGetProfileQuery();
    console.log(profileRes)

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const form = event.target;

        if (form.checkValidity()) {
            const body = {
                name: form["Name :"]?.value,
                phone: form["Mobile Number :"]?.value,
                dob: form["Birth Date & Time"]?.value,
                gender: form["Gender :"]?.value,
                placeOfBirth: form["placeOfBirth"]?.value,
            };

            try {
                await patchUser(body);
            } catch (error) {
                console.error("Error updating profile", error);
            }
        }

        form.classList.add("was-validated");
    };

    useEffect(() => {
        if (patchUserRes.isSuccess) {
            profileRes.refetch();
        }
    }, [patchUserRes]);

    if (profileRes.isLoading) return <div className='w-100 container mt-4 '>
        <div className="mt-4 mb-4 ">
            <div className="mb-3 d-flex align-items-center justify-content-center placeholder-glow">
                <img
                    className='placeholder'
                    style={
                        { height: 132, width: 132 }
                    }
                />

            </div>
            <div className="d-flex justify-content-center mb-3">
                {Icons.user("me-2")}

            </div>
            <div className="mx-auto" style={{ height: 1, width: 131, borderTop: "1px solid #FFA400" }} />
        </div>

        <div className="">
            <h5 className="fs-14 text-center fw-bold mb-3">Profile</h5>

            <div className="row row-cols-1 row-cols-lg-2 g-3 mb-3">
                <Input name="Name :" />
                <Input name="Email Id :" type="text" />
                <Input name="Mobile Number : " type="text" />

                <div className="col">
                    <label htmlFor="name" className="form-label text-capitalize">Gender :</label>
                    <div className="d-flex justify-content-between w-100">
                        <input type="radio" className="btn-check" name="gender" id="option2" autoComplete="off" />
                        <label className="btn btn-white btn-outline-primary" htmlFor="option2" style={{ width: 120 }}>Male</label>

                        <input type="radio" className="btn-check" name="gender" id="option3" autoComplete="off" />
                        <label className="btn btn-white btn-outline-primary" htmlFor="option3" style={{ width: 120 }}>Female</label>

                        <input type="radio" className="btn-check" name="gender" id="option4" autoComplete="off" />
                        <label className="btn btn-white btn-outline-primary" htmlFor="option4" style={{ width: 120 }}>Other</label>
                    </div>
                </div>

                <p className='mb-1'> Birth Date & Time </p>
                <div className="container  px-0 mt-0">
                    <div className="row">
                        {/* <Input type="date" name="dob" noLabel /> */}
                        <DateInput />
                    </div>
                </div>

                <div className="d-flex justify-content-between bg-white rounded-10 py-2 shadow-sm">
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Not Sure of Time</label>
                    <div className="form-check form-switch">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"


                        />
                    </div>
                </div>

                <Input type="text" name="streetAddress" />
            </div>

            <div className="text-center">
                <button className="btn btn-primary rounded-pill" type="submit">
                    Edit Profile
                </button>
            </div>
        </div>

    </div>;
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
            {patchUserRes.isSuccess && <SuccessModal message="Profile updated successfully!" />}
            {patchUserRes.isError && <ApiErrorModal res={patchUserRes} />}
            <form className="needs-validation" onSubmit={onSubmitHandler} noValidate>
                <div className="mt-4 mb-4">
                    <div className="mb-3 d-flex align-items-center justify-content-center">
                        {user?.userPicture && (
                            <ProfilePictureInput
                                placeholder={profileRes.isLoading}
                                defaultValue={user?.userPicture?.src}
                                name={user?.name}
                                size={132}
                            />
                        )}
                    </div>
                    <div className="d-flex justify-content-center mb-3">
                        {Icons.user("me-2")}
                        {user?.name}, {age}
                    </div>
                    <div className="mx-auto" style={{ height: 1, width: 131, borderTop: "1px solid #FFA400" }} />
                </div>

                <div className="">
                    <h5 className="fs-14 text-center fw-bold mb-3">Profile</h5>

                    <div className="row row-cols-1 row-cols-lg-2 g-3 mb-3">
                        <Input name="Name :" defaultValue={user?.name} />
                        <Input name="Email Id :" type="text" defaultValue={user?.email} disabled />
                        <Input name="Mobile Number :" type="text" defaultValue={user?.phone} />

                        <div className="col">
                            <GenderInput name="Gender :" defaultCheck={user?.gender} />
                        </div>


                        {/* <Input type="date" name="dob" defaultValue={user?.dob?.split('T')[0]} noLabel />
                                <Input type="time" name="birthTime" value={birthTime} onChange={(e) => setBirthTime(e.target.value)} disabled={!isTimeSure} noLabel /> */}
                        <DateInput name=" Birth Date & Time" />




                        <Input type="text" name="placeOfBirth" defaultValue={user?.placeOfBirth} />
                    </div>

                    <div className="text-center mb-3">
                        <button className="btn btn-primary rounded-pill" type="submit">
                            Edit Profile
                        </button>
                    </div>
                </div>
            </form>
        </Page>
    );
};

export default EditProfile;
