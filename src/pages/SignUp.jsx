import { useSignUpMutation } from '../services/authSlice';

const SignUp = () => {


  const [signUp, signUpResponse] = useSignUpMutation();

  const onSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form["name"].value;
    const email = form["email"].value;
    const password = form["password"].value;
    const body = { name, email, password };
    signUp(body)
  };

  const submitBtnClassname =
    "btn btn-primary align-self-start rounded-pill px-5 shadow";



  return (
    <>
      <div className="w-100 h-100 d-flex justify-content-center align-items-center">
        <form
          className="bg-succes w-100 px-5 py-3"
          onSubmit={onSubmit}
          noValidate
        >
          {/* {/* <Input name={"userName"} labelName={null} containerClass={" mb-3"} required /> */}
          {/* <Input name={"password"} type={"password"} containerClass={" mb-4"} required /> */}

          <input
            type="name"
            name="name"
            className="form-control form-control-sm rounded-pill p-2 ps-3 shadow-sm mb-3 border-info shadow"
            placeholder="Name"
          />
          <input
            type="email"
            name="email"
            className="form-control form-control-sm rounded-pill p-2 ps-3 shadow-sm mb-3 border-info shadow"
            placeholder="Email ID"
          />
          <input
            type="password"
            name="password"
            className="form-control form-control-sm rounded-pill p-2 ps-3 shadow-sm mb-3 border-info shadow"
            placeholder="Password"
          />

          <div className="d-flex justify-content-between mb-3 w-100 ">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
              />
              <label
                className="form-check-label fs-6"
                htmlFor="flexCheckDefault"
              >
                Remember Me
              </label>
            </div>

            <div className="fw-bold fs-6 cursor-pointer">
              Forgot Password?
            </div>
          </div>
          {signUpResponse.isLoading ? (
            <button className={submitBtnClassname} type="button" disabled>
              <span
                className="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>{" "}
              Logging in...
            </button>
          ) : (
            <button className={submitBtnClassname}>Login</button>
          )}
        </form>
      </div>
    </>
  );

}

export default SignUp