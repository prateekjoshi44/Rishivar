
import { useState, useMemo } from "react";
import { useGetPostsQuery } from "../../services/postSlice";
import ApiErrorModal from "../../components/modal/ApiErrorModal";
import Page from "../../layout/Page";
import PostCard from "../../components/postCard/PostCard";
import ProfilePicture from "../../components/ProfilePicture";
import SearchBar from "../../components/ui/SearchBar";

const Posts = () => {
  const postRes = useGetPostsQuery();
  const [selectedAstrologer, setSelectedAstrologer] = useState(null);
  const [search, setSearch] = useState("");

  const posts = postRes.data || [];

  const astrologers = useMemo(() => {
    const uniqueAstrologers = [];
    posts.forEach((post) => {
      if (!uniqueAstrologers.some((ast) => ast?.id === post.astro?.id)) {
        uniqueAstrologers.push(post.astro);
      }
    });
    return uniqueAstrologers;
  }, [posts]);


  const filteredPosts = useMemo(() => {
    let filtered = posts;

    if (selectedAstrologer) {
      filtered = filtered.filter((post) => post.astro?.id === selectedAstrologer);
    }

    if (search !== "") {
      filtered = filtered.filter((post) => post.astro?.name.toLowerCase().includes(search.toLowerCase()));
    }

    return filtered;
  }, [posts, selectedAstrologer, search]);

  if (postRes.isLoading) {
    return (
      <Page>
        <div className="row row-cols-lg-3 row-cols-1 g-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <PostCard key={index} placeholder={true} />
          ))}
        </div>
      </Page>
    );
  }

  if (postRes.isError) return <ApiErrorModal res={postRes} />;

  return (
    <Page>
      <SearchBar
        search={search}
        setSearch={setSearch}
        setIcons={false}
        placeholder="Search for astrologers"
      />

      <div className="d-flex align-items-center pt-3">
        <div className="d-flex overflow-auto">
          {astrologers.map((astrologer) => (
            <div
              key={astrologer?.id}
              className={`d-flex align-items-center bg-white border shadow-sm rounded-10 align-items-center mx-2 py-1 px-2${selectedAstrologer === astrologer?.id ? "border border-warning px-2" : ""}`}
              style={{ cursor: "pointer" }}
              onClick={() => setSelectedAstrologer(astrologer?.id)}
            >
              <ProfilePicture picture={astrologer.astroPicture.src} imgClass="rounded-circle " name="profilePicture" size={24} />
              <p className="text-center fs-12 font-semibold ms-2">{astrologer?.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="row row-cols-lg-3 row-cols-1 g-3 mt-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post, index) => (
            <PostCard post={post} key={index} />
          ))
        ) : (
          <div className="text-center mt-5">
            <p>No posts available for this astrologer.</p>
          </div>
        )}
      </div>
    </Page>
  );
};

export default Posts;
