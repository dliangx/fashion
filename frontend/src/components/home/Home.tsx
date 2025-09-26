import Footer from "../common/Footer";
import Header from "../common/Header";
import Collections from "./Collections";
import NewArrival from "./NewArrival";
import Recommend from "./Recommend";

const Home = () => {
  return (
    <div className="h-full ">
      <Header />
      <Collections />
      <NewArrival />
      <Recommend />
      <Footer />
      <div className="h-16" />
    </div>
  );
};

export default Home;
