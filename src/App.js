import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import VideoCard from "./components/VideoCard";
import BottomNavbar from "./components/BottomNavbar";
import TopNavbar from "./components/TopNavbar";

const videoUrls = [
  {
    url: require("./videos/video1.mp4"),
    profilePic: "https://i.pravatar.cc/100?img=5",
    username: "csjackie",
    description: "Lol nvm #compsci #chatgpt #ai #openai #techtok",
    song: "Original sound - Famed Flames",
    likes: 430,
    comments: 13,
    saves: 23,
    shares: 1,
  },
  {
    url: require("./videos/video2.mp4"),
    profilePic: "https://i.pravatar.cc/100?img=10",
    username: "dailydotdev",
    description:
      "Every developer brain @francesco.ciulla #developerjokes #programming #programminghumor #programmingmemes",
    song: "tarawarolin wants you to know this isnt my sound - Chaplain J Rob",
    likes: "13.4K",
    comments: 3121,
    saves: 254,
    shares: 420,
  },
  {
    url: require("./videos/video3.mp4"),
    profilePic: "https://i.pravatar.cc/100?img=15",
    username: "wojciechtrefon",
    description:
      "#programming #softwareengineer #vscode #programmerhumor #programmingmemes",
    song: "help so many people are using my sound - Ezra",
    likes: 5438,
    comments: 238,
    saves: 12,
    shares: 117,
  },
  {
    url: require("./videos/video4.mp4"),
    profilePic: "https://i.pravatar.cc/100?img=20",
    username: "faruktutkus",
    description:
      "Wait for the end | Im RTX 4090 TI | #softwareengineer #codinglife #codingmemes",
    song: "orijinal ses - Computer Science",
    likes: 9689,
    comments: 230,
    saves: 1037,
    shares: 967,
  },
];

function App() {
  const [videos] = useState(videoUrls); // Removed unused `setVideos`
  const [filteredVideos, setFilteredVideos] = useState(videoUrls);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [showInfo, setShowInfo] = useState(false);
  const videoRefs = useRef([]);
  const startY = useRef(null); // Fix: Declare `startY` using useRef

  useEffect(() => {
    if (searchTerm) {
      const lowerCaseSearch = searchTerm.toLowerCase();
      const filtered = videos.filter((video) =>
        video.description.toLowerCase().includes(lowerCaseSearch)
      );
      setFilteredVideos(filtered);
    } else {
      setFilteredVideos(videos);
    }
  }, [searchTerm, videos]);

  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
  };

  useEffect(() => {
    const currentRefs = videoRefs.current;

    const observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.75,
    });

    currentRefs.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      currentRefs.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, [filteredVideos]);

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      const videoElement = entry.target;
      if (entry.isIntersecting) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    });
  };

  const handleMouseDown = (e) => {
    startY.current = e.clientY; // Fix: Use `startY.current`
  };

  const handleMouseUp = (e) => {
    if (startY.current === null) return; // Fix: Use `startY.current`

    const endY = e.clientY;
    const distance = endY - startY.current; // Fix: Use `startY.current`

    if (distance > 100 && currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
    } else if (distance < -100 && currentIndex < filteredVideos.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }

    startY.current = null; // Reset `startY.current`
  };

  useEffect(() => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      currentVideo.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowRight") {
        setShowInfo(true);
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  const handleClosePopup = (e) => {
    if (e.target.className === "popup") {
      setShowInfo(false);
    }
  };

  return (
    <div
      className="app"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <div className="container">
        <TopNavbar setSearchTerm={setSearchTerm} />
        {filteredVideos.map((video, index) => (
          <VideoCard
            key={index}
            username={video.username}
            description={video.description}
            song={video.song}
            likes={video.likes}
            saves={video.saves}
            comments={video.comments}
            shares={video.shares}
            url={video.url}
            profilePic={video.profilePic}
            setVideoRef={handleVideoRef(index)}
          />
        ))}
        <BottomNavbar />
      </div>

      {showInfo && (
        <div className="popup" onClick={handleClosePopup}>
          <div className="popup-content">
            <h3>Thông tin Video</h3>
            <p>
              <b>Người đăng:</b> {filteredVideos[currentIndex]?.username}
            </p>
            <p>
              <b>Mô tả:</b> {filteredVideos[currentIndex]?.description}
            </p>
            <p>
              <b>Bài hát:</b> {filteredVideos[currentIndex]?.song}
            </p>
            <p>
              ❤️ {filteredVideos[currentIndex]?.likes} | 💬{" "}
              {filteredVideos[currentIndex]?.comments} | 🔖{" "}
              {filteredVideos[currentIndex]?.saves}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
