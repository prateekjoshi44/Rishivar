
import { useEffect } from "react";
import {
  usePatchRazorpayPaymentMutation,
  usePostRazorpayPaymentMutation,
} from "../services/razorpayPaymentSlice";
import { useGetProfileQuery } from "../services/profileSlice";
import ApiErrorModal from "../components/modal/ApiErrorModal";
import PageLoading from "../components/PageLoading";
import Input from "../components/form/Input";

const RazorpayPayment = ({ amount, setAmount }) => {
  const profileRes = useGetProfileQuery();
  const [postRazorpay, postRazorpayRes] = usePostRazorpayPaymentMutation();
  const [patchRazorpay, patchRazorpayRes] = usePatchRazorpayPaymentMutation();

  const loadRazorpayScript = () => {
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.body.appendChild(script);
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await postRazorpay({ amount });
      if (res?.error) return;

      await loadRazorpayScript();

      {
        if (window.cordova) {
          const options = {
            key: "rzp_test_Jca4fuez2XRTU1",
            name: "App",
            description: "Perfect panel",
            order_id: res.data.id,
            amount: res.data.amount,
            handler: patchRazorpay,
            notes: {
              address: "Razorpay Corporate Office",
            },
          };

          const successCallback = function (success) {
            patchRazorpay(success);
          };

          const cancelCallback = function (error) {
            alert(error.description + " (Error " + error.code + ")");
          };

          window.Razorpay(options);
          window.RazorpayCheckout.on("payment.success", successCallback);
          window.RazorpayCheckout.on("payment.cancel", cancelCallback);
          window.RazorpayCheckout.open(options);
        } else {
          openRazorpayCheckout(res.data);
        }
      }
    } catch (error) {
      console.error("Error creating payment:", error);
    }
  };

  const openRazorpayCheckout = ({ id, amount }) => {
    const options = {
      key: "rzp_test_Jca4fuez2XRTU1",
      name: "App",
      description: "Perfect panel",
      order_id: id,
      amount,
      handler: patchRazorpay,
      notes: {
        address: "Razorpay Corporate Office",
      },
    };

    const razorpayInstance = new window.Razorpay(options);
    razorpayInstance.open();
  };

  useEffect(() => {
    if (patchRazorpayRes.isSuccess) profileRes.refetch();
  }, [patchRazorpayRes]);

  if (profileRes.isLoading) return <PageLoading />;
  if (profileRes.isError) return <ApiErrorModal res={profileRes} />;

  return (
    <div className="container ">
      <div className="p-4 border-0 rounded-4">
        <div className="d-flex align-items-center justify-content-center mb-4">
          <div className="border-top border-dark" style={{ width: 133 }}></div>
          <p className="mx-4 mb-0">Or</p>
          <div className="border-top border-dark" style={{ width: 133 }}></div>
        </div>

        <form onSubmit={onSubmit} noValidate className="text-center">
          <Input
            inputClass=" w-50 mx-auto mb-3 text-center"
            type="number"
            name="Enter a Custom Amount"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            placeholder="Enter amount"
          />

          {postRazorpayRes.isLoading ? (
            <button className="btn btn-primary w-50" type="button" disabled>
              <span
                className="spinner-grow spinner-grow-sm"
                aria-hidden="true"
              ></span>
              <span role="status"> Processing...</span>
            </button>
          ) : (
            <div
              className="bg-white shadow-sm border rounded-top-5 border-top fixed-bottom w-100 px-4"
            >
              <button
                type="submit"
                className="btn shadow-sm btn-primary w-100 py-2 my-4 rounded-3"
              >
                Proceed to Add Money
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default RazorpayPayment;
