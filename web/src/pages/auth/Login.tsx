import { FormEvent, useState } from "react";
import { Auth } from "@services/api/auth";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("colereid@gmail.com");

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);

    await Auth.requestOtp(email);

    alert("Check your email for the login link!");
    setLoading(false);
  };

  return (
    <>
      <div className="container mx-auto p-4 flex justify-center">
        <div className="mt-10">
          <h1 className="header text-3xl mb-4">Login</h1>
          <p className="description mb-2">
            Sign in via magic link with your email below
          </p>
          <form className="form-widget" onSubmit={handleLogin}>
            <div>
              <input
                className="mb-2 text-slate-500 p-2"
                type="email"
                placeholder="Your email"
                value={email}
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <button
                className={
                  "mt-2 px-5 py-2.5 text-sm font-medium text-white bg-slate-700 hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 rounded-lg text-center dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
                }
                disabled={loading}
              >
                {loading ? <span>Loading</span> : <span>Send magic link</span>}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
