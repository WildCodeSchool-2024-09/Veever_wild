import Discovery from "../../components/Discovery/Discovery";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import PreHeader from "../../components/PreHeader/PreHeader";
import Logout from "../../components/logout/Logout";

export default function HomePage() {
  return (
    <>
      <Logout />
      <PreHeader />
      <Discovery />
      <NewsLetter />
    </>
  );
}
