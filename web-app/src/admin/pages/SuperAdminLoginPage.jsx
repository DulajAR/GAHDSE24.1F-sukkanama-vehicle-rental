import SuperAdminLogin from "../components/SuperAdminLogin";

const SuperAdminLoginPage = () => {
  return (
    <>
      <style>{`
        .super-admin-login-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          width: 100vw;
          padding: 20px;
          background-color: #f0f2f5;
          box-sizing: border-box;
        }

        .super-admin-login-page h1 {
          width: 100%;
          max-width: 400px;
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 20px;
          color: #333;
        }

        .super-admin-login-container {
          width: 100%;
          max-width: 400px;
          display: flex;
          justify-content: center;
        }
      `}</style>

      <div className="super-admin-login-page">
        <h1>Welcome to Super Admin Dashboard Login</h1>
        <div className="super-admin-login-container">
          <SuperAdminLogin />
        </div>
      </div>
    </>
  );
};

export default SuperAdminLoginPage;
