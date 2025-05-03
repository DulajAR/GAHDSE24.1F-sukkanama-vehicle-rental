import Header from "../components/Header";
import Footer from "../components/Footer";
import VehicleAddUpdateForm from "../components/VehicleAddUpdateForm";

const VehicleAddUpdatePage = () => {
  return (
    <div className="vehicle-add-update-page">
      <Header />
      <VehicleAddUpdateForm />
      <Footer />
    </div>
  );
};

export default VehicleAddUpdatePage;