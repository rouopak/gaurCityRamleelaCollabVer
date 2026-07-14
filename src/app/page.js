
import AboutUs from "@/sections/home/AboutUs";
import ChooseUs from "@/sections/home/ChooseUs";
import MainMembers from "@/sections/home/MainMembers";
import Past4Events from "@/sections/home/Past4Events";
import NoticeBoard from "@/sections/home/NoticeBoard";
import NewHero from "@/sections/home/NewHero";
const Home = () => {
  return (
    <>
      <NewHero />
      <AboutUs />
      <ChooseUs />
      <MainMembers />
      <Past4Events />
      <NoticeBoard />
    </>
  );
};

export default Home;