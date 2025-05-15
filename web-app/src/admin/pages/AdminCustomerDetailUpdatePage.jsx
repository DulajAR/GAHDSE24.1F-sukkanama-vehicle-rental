// src/pages/AdminCustomerDetailUpdatePage.jsx
import AdminHeader from "../components/AdminHeader";
import AdminCustomerDetailUpdate from "../components/AdminCustomerDetailUpdate";

const AdminCustomerDetailUpdatePage = () => {
  return (
    <div style={styles.pageContainer}>
      <AdminHeader />
      <div style={styles.contentContainer}>
        <div style={styles.formWrapper}>
          <AdminCustomerDetailUpdate />
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    display: "flex",
    flexDirection: "column",
    minHeight: "100vh",
  },
  contentContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    flexGrow: 1,
    padding: "0 20px",
  },
  formWrapper: {
    width: "100%",
    maxWidth: "700px",  // wider than before
  },
};

export default AdminCustomerDetailUpdatePage;
