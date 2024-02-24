import { FormEvent, useState } from "react";

interface UserEnrollmentStatus {
  userId: string;
  papayaSubscription: Record<string, unknown>;
  serviceSubscription: Record<string, unknown>;
}

export default function Home() {
  const [userEnrollmentStatus, setUserEnrollmentStatus] =
    useState<UserEnrollmentStatus>();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const formProps = Object.fromEntries(formData) as Record<string, string>;
    const userId = formProps?.["user-id"];

    if (userId) {
      const request = await fetch(
        `/api/get-user-enrollment-status?userId=${formProps?.["user-id"]}`
      );
      const response = await request.json();

      setUserEnrollmentStatus(response?.userEnrollmentStatus);
    }
  }

  return (
    <div className="w-full h-[100vh] flex items-center justify-center">
      <main>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center w-full max-w-5xl"
        >
          <input
            type="text"
            name="user-id"
            id="user-id"
            required
            className="border rounded-md border-zinc-950 w-full h-8 max-w-80 px-2"
          />

          <button
            type="submit"
            className="border rounded-md border-zinc-950 w-28 py-2 mt-4"
          >
            Submit
          </button>
        </form>

        {userEnrollmentStatus && (
          <div className="mt-8 flex flex-col gap-2 border p-4 rounded-md border-zinc-950">
            <span>User ID: {userEnrollmentStatus?.userId}</span>
            <h1>
              Papaya Subscription:{" "}
              {userEnrollmentStatus?.papayaSubscription ? "Active" : "Unactive"}
            </h1>

            <h1>
              Service Subscription:{" "}
              {userEnrollmentStatus?.serviceSubscription
                ? "Active"
                : "Unactive"}
            </h1>
          </div>
        )}
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
