import BlogArticles from "../../components/BlogArticles/BlogArticles";
import Discovery from "../../components/Discovery/Discovery";
import NewsLetter from "../../components/NewsLetter/NewsLetter";
import PreHeader from "../../components/PreHeader/PreHeader";

export default function HomePage() {
  return (
    <>
      <PreHeader />
      <Discovery />
      <BlogArticles />
      <NewsLetter />
    </>
  );
}
