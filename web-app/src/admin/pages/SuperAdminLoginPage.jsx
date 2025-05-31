import SuperAdminLogin from "../components/SuperAdminLogin";

const SuperAdminLoginPage = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f0f2f5",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: "40px",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "20px",
        }}
      >
        Welcome
      </h1>
      <SuperAdminLogin />
    </div>
  );
};

export default SuperAdminLoginPage;
