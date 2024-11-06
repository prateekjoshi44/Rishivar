import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useGetOrdersQuery } from '../../services/orderSlice';
import { useGetProfileQuery } from '../../services/profileSlice';
import ApiErrorModal from '../../components/modal/ApiErrorModal';
import Page from '../../layout/Page';
import ProfilePicture from '../../components/ProfilePicture';
import Icons from '../../components/ui/Icons';

const Orders = () => {
  const orderRes = useGetOrdersQuery();
  const userProfileRes = useGetProfileQuery();

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };


  const filteredOrders = useMemo(() => {
    if (selectedFilter === "All") return orderRes.data || [];
    return (orderRes.data || []).filter(order => {
      if (selectedFilter === "Message" && order.chat) return true;
      if (selectedFilter === "Audio Call" && order.call?.type === "AudioCall") return true;
      if (selectedFilter === "Video Call" && order.call?.type === "VideoCall") return true;
      return false;
    });
  }, [selectedFilter, orderRes.data]);
  const renderOrders = (order) => {
    const type = order.chat ? "Chat Consultation" : order.call?.type === "AudioCall" ? "Audio Call Consultation" : "Video Call Consultation";

    return (
      <div className="col-12 mb-3" key={order.id}>
        <div className="card shadow-sm rounded-4 " style={{ padding: " 0.8rem 1rem" }}>
          <div className="d-flex justify-content-between align-items-center mb-3 ">
            <div className="">
              <div className="fs-12 fw-bold mb-2"> {type}</div>
              <div className="mb-2 fs-10">
                ORDER ID: <b>{order.id}</b>
              </div>
              <div className="gradient-border"></div>
            </div>

            <div className="d-flex align-items-center">
              <Link to={`/Astro/${order.astroId}`} className="me-1">
                <ProfilePicture
                  imgClass="rounded-circle"
                  picture={order.astro?.astroPicture?.src}
                  name={order.astro?.name}
                  size={48}
                />
              </Link>
              <Link to={`/User/${order.userId}`}>
                <ProfilePicture
                  imgClass="rounded-circle ms-3"
                  picture={userProfileRes.data?.userPicture?.src}
                  name={userProfileRes.data?.name}
                  size={48}
                />
              </Link>
            </div>
          </div>

          <span className="fs-10 mb-3 text-dark">
            {new Date(order.createdAt).toLocaleDateString()}{" "}
            {new Date(order.createdAt).toLocaleTimeString()}
          </span>

          <div className="d-flex flex-column justify-content-between align-items-center mb-3 ">
            <div className="d-flex w-100 justify-content-between fs-12">
              <p className="fw-normal mb-2"> Your Rating:</p>
              <span className="d-flex align-items-center fw-semibold">
                {order.rating ? (
                  <div className="d-flex align-items-center">
                    {Icons.star("me-1 text-warning")}
                    {order.rating.rating} Stars
                  </div>
                ) : (
                  <Link to={`/Order/${order.id}`} className="d-flex text-decoration-none align-items-center text-warning fw-normal">
                    {Icons.rateAstrologer("me-1 text-warning")}
                    Rate Astrologer
                  </Link>
                )}
              </span>
            </div>

            <div className="d-flex w-100 justify-content-between fs-12">
              <p className="fw-normal mb-2">Consultation with:</p>
              <p className="fw-semibold">
                {order.astro?.name || "Unknown Astrologer"}
              </p>
            </div>

            {isExpanded && (
              <>
                <div className="d-flex w-100 justify-content-between fs-12">
                  <p className="fw-normal mb-2">Chat Price Per Minute:</p>
                  <p className="fw-semibold">₹{order.rate}</p>
                </div>

                <div className="d-flex w-100 justify-content-between fs-12">
                  <p className="fw-normal mb-2">Chat Duration:</p>
                  <p className="fw-semibold"> {order.duration} Minutes</p>
                </div>
              </>
            )}

            <div className="d-flex w-100 justify-content-between fs-12">
              <p className="fw-normal ">Total Calculated Amount:</p>
              <p className="fw-semibold"> ₹{order.amount}</p>
            </div>
          </div>

          <div className="d-flex justify-content-between align-items-center">
            {order.chat ? (
              <Link
                to={`/Order/${order.id}`}
                className="d-flex text-white order_gradient btn btn-warning rounded-pill"
              >
                <p className="fs-12">

                  <>
                    {Icons.message("me-1 fs-5")}
                    View Chat
                  </>

                </p>
              </Link>
            ) : (
              ""
            )}

            <div
              className="d-flex align-items-center text-decoration-none  ms-auto  fs-10 "
              onClick={toggleExpand}
            >
              {isExpanded ? (
                <>
                  View Less Order {Icons.closeDropdown("ms-1")}
                </>
              ) : (
                <>
                  View Complete Order {Icons.dropDown("ms-1")}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );

  };

  if (userProfileRes.isLoading || orderRes.isLoading) {
    return (
      <div className="container">
        {Array.from({ length: 5 }).map((_, index) => (
          <div className="col card-group mx-3 mt-3" key={index} >
            <div className="card shadow rounded-3 overflow-hidden p-3 placeholder-glow">
              <div className="d-flex ms-2 my-2 align-items-center">
                <div className="bg-secondary rounded-circle placeholder" style={{ height: 50, width: 50 }}></div>
                <div className='ms-3 d-flex flex-column'>
                  <span className="placeholder col-6">Placeholder Name</span>
                  <div className="">
                    <span className="placeholder col-12 mt-1">Audio - Placeholder Date</span>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between">
                <span className="placeholder col-5"></span>
                <span className="placeholder col-3"></span>
              </div>
              <div className="d-flex justify-content-between mt-2">
                <span className="placeholder col-4"></span>
                <span className="placeholder col-3"></span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (orderRes.isError) return <ApiErrorModal res={orderRes} />;
  if (userProfileRes.isError) return <ApiErrorModal res={userProfileRes} />;

  return (
    <Page>
      <div className="d-flex overflow-x-auto hide-scroll mb-4" style={{ whiteSpace: "nowrap" }}>
        {[
          { icon: Icons.allOrders("me-2"), text: "All" },
          { icon: Icons.filledMessage("me-2"), text: "Message" },
          { icon: Icons.filledAudioCall("me-2"), text: "Audio Call" },

          { icon: Icons.filledVideoCall("me-2"), text: "Video Call" }
        ].map((filter) => (
          <div
            key={filter.text}
            className={`me-1 bg-white fs-12 d-flex align-items-center px-2 py-1 rounded-10 border text-dark ${selectedFilter === filter.text ? "border-primary" : ""}`}
            onClick={() => setSelectedFilter(filter.text)}
          >
            {filter.icon} {filter.text}
          </div>
        ))}
      </div>

      <div className="row row-cols-1 g-3">
        {filteredOrders.length > 0 ? (
          filteredOrders.map(renderOrders)
        ) : (
          <div className="text-center mt-5">
            <p>No orders available for this filter.</p>
          </div>
        )}
      </div>
    </Page>
  );
};

export default Orders;