
import { useState } from "react";
import RazorpayPayment from "../../razorpay/RazorpayPayment";
import { useGetProfileQuery } from "../../services/profileSlice";
import PageLoading from "../../components/PageLoading";
import ApiErrorModal from "../../components/modal/ApiErrorModal";
import Icons from "../../components/ui/Icons";
import { Link } from "react-router-dom";

const Wallet = () => {
  const profileRes = useGetProfileQuery();
  const [amount, setAmount] = useState(100);
  const [activeTab, setActiveTab] = useState("topup");

  const cardData = [
    { value: "50" },
    { value: "100" },
    { value: "200" },
    { value: "300" },
    { value: "500" },
    { value: "1000" },
  ];

  const activeCardClass = "bg-success text-white";

  const transactionHistory = [
    // {
    //   id: 1,
    //   status: "Success",
    //   amount: 50,
    //   date: "21 September 2024",
    //   time: "15:00",
    // },
    // {
    //   id: 2,
    //   status: "Failed",
    //   amount: 50,
    //   date: "21 September 2024",
    //   time: "15:00",
    // },
    // {
    //   id: 3,
    //   status: "Success",
    //   amount: 100,
    //   date: "21 September 2024",
    //   time: "15:00",
    // },
    // {
    //   id: 4,
    //   status: "Failed",
    //   amount: 100,
    //   date: "21 September 2024",
    //   time: "15:00",
    // },
    // {
    //   id: 5,
    //   status: "Success",
    //   amount: 50,
    //   date: "21 September 2024",
    //   time: "15:00",
    // },
  ];

  if (profileRes.isLoading) return <PageLoading />;
  if (profileRes.isError) return <ApiErrorModal res={profileRes} />;

  console.log(profileRes.data)

  return (
    <>
      <div
        className="wallet_gradient  text-white fw-bold d-flex flex-column align-items-center justify-content-center  "
        style={{ height: "44%" }}
      >
        <p>Hey, {profileRes.data.name ? profileRes.data.name : 'Vipul'}</p>
        <h1 className="my-4 fw-semibold">Available Balance</h1>
        <h1 className="fw-semibold"> ₹ {profileRes.data.balance}.00</h1>
      </div>



      <div className="bg-white">
        <div className="bg-white rounded-top-4 position-relative" style={{ top: -40, marginBottom: '0' }}>
          <ul className="nav nav-pills bg-white shadow-sm rounded-pill rounded-5  d-flex justify-content-center  position-relative  " style={{ top: -30, marginLeft: 60, marginRight: 60 }}>

            <li className="nav-item">
              <a
                className={`nav-link text-dark h-100 px-2 py-3 mx-2 ${activeTab === "topup" ? "border-bottom border-dark rounded-0 " : ""}`}
                href="#"
                onClick={() => setActiveTab("topup")}
              >
                {Icons.walletFilled("me-2")}
                Top Up
              </a>
            </li>
            <div className="border border-dark border-1 my-3"></div>
            <li className="nav-item">
              <a
                className={`nav-link text-dark  px-2 py-3 mx-2 ${activeTab === "history" ? " border-bottom border-dark rounded-0" : ""}`}
                href="#"
                onClick={() => setActiveTab("history")}
              >
                {Icons.history("me-2")}
                History
              </a>
            </li>
          </ul>
        </div>
        <div className="postion-relative" style={{ marginTop: -40 }}> {activeTab === "topup" && (
          <div className="rounded-top-3 overflow-y-auto overflow-scroll">
            <div className="container">
              <div className="row row-cols-3 g-4">
                {cardData.map((a) => (
                  <div className="col " key={a.value}>
                    <div
                      className={`card text-center h-100 ${amount === a.value ? activeCardClass : ""}`}
                      onClick={() => setAmount(a.value)}
                    >
                      <div className="card-body">
                        <p className="fw-bold fs-11">Add ₹{a.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <RazorpayPayment amount={amount} setAmount={setAmount} />

            <div className="container shadow  " style={{ marginBottom: 50, paddingBottom: 75 }}>
              <Link to="/Coupons" className="text-decoration-none border py-3 rounded-4 w-100 d-flex justify-content-between align-items-center">
                <div className="text-dark">{Icons.percentage("mx-3 fs-3")} View All Coupon</div>
                {Icons.arrowCircle("me-3 fs-3")}
              </Link>
            </div>
          </div>
        )}

          {activeTab === "history" && (
            <div className="container pb-5">
              {transactionHistory.length === 0 ? (
                <div className="text-center my-5">
                  <div className="text-center my-5">
                    {Icons.noTransaction("", { height: 192, width: 299.19 })}
                  </div>

                  <p className="fs-12 fw-semibold mb-2 ">No Recent Transactions!</p>
                  <p className="fs-12">Add funds to keep your wallet ready for use.</p>

                </div>
              ) : (
                transactionHistory.map((transaction) => (

                  <div key={transaction.id} className="d-flex justify-content-between align-items-center border-bottom py-3 ">
                    <div className="d-flex align-items-center">
                      {Icons.currency("fs-4 me-3")}
                      <div>
                        <p className="mb-1 fw-semibold">Money Added to Wallet: ₹{transaction.amount}</p>
                        <small className="text-muted">{transaction.date} {transaction.time}</small>
                      </div>
                    </div>
                    <div className={`text-${transaction.status === "Success" ? "success" : "danger"} fw-bold`}>
                      {transaction.status === "Success" ? `₹${transaction.amount}` : "Failed"}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}</div>

      </div>
    </>
  );
};

export default Wallet;
