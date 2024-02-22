import Head from "next/head";
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
        `/api/get-user-enrollment-status?userId=${formProps?.["user-id"]}`,
      );
      const response = await request.json();

      setUserEnrollmentStatus(response?.userEnrollmentStatus);
    }
  }

  return (
    <div className="container">
      <Head>
        <title>Search Users</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <form onSubmit={handleSubmit}>
          <input type="text" name="user-id" id="user-id" required />

          <button type="submit">Submit</button>
        </form>

        {userEnrollmentStatus && (
          <div className="">
            <span>{userEnrollmentStatus?.userId}</span>
            {userEnrollmentStatus?.papayaSubscription && (
              <h1>Has subscription</h1>
            )}

            {userEnrollmentStatus?.serviceSubscription && (
              <h1>Has service subscription</h1>
            )}
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
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
