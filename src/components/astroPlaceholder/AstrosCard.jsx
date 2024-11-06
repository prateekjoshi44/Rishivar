import { useNavigate } from 'react-router-dom';

import ImgRenderer from '../ImgRenderer';
import Icons from "../../components/ui/Icons";


const AstrosCard = ({
    placeholder,
    id,
    name,

    experience,
    audioCallPrice,
    videoCallPrice,
    languages,
    chatPrice,
    astroPicture,
    isBusy,
    audioCallAvailabilityStatus,
    videoCallAvailabilityStatus,
    chatAvailabilityStatus,
    showContact,
    showAvailability,
}) => {
    const navigate = useNavigate();



    if (placeholder) {
        return (
            <div className="col" key={id}>
                <div className="card h-100 shadow border-0 rounded-4 overflow-hidden placeholder-glow" onClick={() => navigate("./" + id)}>
                    <div className="rounded-4 placeholder" style={{ width: '100%', height: '150px', overflow: 'hidden' }}>

                    </div>

                    {showContact && (
                        <div className="position-absolute d-flex flex-column align-items-end gap-2 px-1 py-2 rounded-start-3" style={{ top: 35, right: 0, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                            <div className="bg-success d-flex justify-content-center align-items-center rounded-circle" style={{ height: 16, width: 16 }}>
                                {Icons.message("fs-9")}
                            </div>
                            <div className="bg-success d-flex justify-content-center align-items-center rounded-circle" style={{ height: 16, width: 16 }}>
                                {Icons.phoneCall("fs-9")}
                            </div>
                            <div className="bg-danger d-flex justify-content-center align-items-center rounded-circle" style={{ height: 16, width: 16 }}>
                                {Icons.videoCall("fs-9")}
                            </div>
                        </div>
                    )}

                    <div className="ps-2 mb-2 w-100 placeholder-glow">
                        <div className="mt-2 placeholder fs-12 fw-semibold">name</div>
                        <div className="d-flex flex-wrap mb-1 placeholder">
                            name
                        </div>
                        <div className="mx-3 row row-cols-3 w-100 mx-auto text-center fs-11">
                            <div className="col">
                                {Icons.rupeeSign()}

                            </div>
                            <div className="col">
                                {Icons.rating()}
                                <p className="mb-lg-2 fs-11">New</p>
                            </div>
                            <div className="col">
                                {Icons.experience()}
                                <div className="d-flex">
                                    <p className="mb-lg-2 fs-11 d-flex">12</p>
                                    <p> Yrs</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="placeholder text-center">offline</div>
                </div>
            </div>
        );
    }


    let status = "Offline";
    let statusBgColor = "bg-dark";
    if (isBusy) {
        status = "Busy";
        statusBgColor = "bg-danger";
    } else if (audioCallAvailabilityStatus || videoCallAvailabilityStatus || chatAvailabilityStatus) {
        status = "Online";
        statusBgColor = "bg-success";
    }

    return (
        <div className="col" key={id}>
            <div className="card h-100 shadow border-0 rounded-4 overflow-hidden" onClick={() => navigate("./" + id)}>
                <div className="rounded-4 shadow-sm   " style={{ width: '100%', height: '135px', overflow: 'hidden' }}>
                    <ImgRenderer picture={astroPicture?.src} className="h-100 w-100 object-fit-cover " />
                </div>

                {showContact ? <div className="position-absolute d-flex flex-column align-items-end gap-2   px-1 py-2 rounded-start-3 " style={{ top: 26, right: 0, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                    <div className="bg-success d-flex justify-content-center align-items-center rounded-circle  " style={{ padding: 3 }} >
                        {Icons.message("fs-11")}
                    </div>
                    <div className="bg-success d-flex justify-content-center align-items-center rounded-circle" style={{ padding: 3 }} >
                        {Icons.phoneCall("fs-11")}
                    </div>
                    <div className="bg-danger  d-flex justify-content-center align-items-center rounded-circle " style={{ padding: 3 }}>
                        {Icons.videoCall("fs-11")}
                    </div>
                </div>
                    :
                    null
                }


                <div className="px-2  mb-2 w-100">
                    <div className="mt-2  fs-12 fw-semibold">{name}</div>
                    <div className="d-flex flex-wrap mb-1">

                        {languages?.slice(0, 2).map((language, index) => (
                            <p key={`${language}-${index}`} className="text-center me-1 text-nowrap fs-10 fw-light">{language}</p>
                        ))}
                        {languages?.length > 3 && <p className="text-center fs-10 fw-light">...</p>}
                    </div>
                    <div className=" row row-cols-3  mx-auto ">
                        <div className="col  text-center">
                            {Icons.rupeeSign("fs-15")}
                            <p className="mb-lg-2 fs-10 fw-light ">{Math.min(audioCallPrice, videoCallPrice, chatPrice)}</p>
                        </div>
                        <div className="col  text-center">
                            {Icons.rating("fs-15")}
                            <p className="mb-lg-2 fs-10 fw-light ">New</p>
                        </div>
                        <div className="col text-center ">
                            {Icons.experience("fs-15")}
                            <div className="d-flex justify-content-center">
                                <p className="mb-lg-2 fs-10 fw-light d-flex text-nowrap ">{experience} Yrs</p>
                            </div>
                        </div>
                    </div>
                </div>
                {showAvailability ? <p style={{ paddingTop: 2, paddingBottom: 2 }} className={`w-100 text-center text-white fs-10 fw-medium  mb-0 ${statusBgColor}`}>{status}</p>
                    :
                    null
                }

            </div>
        </div>
    );
};

export default AstrosCard;
