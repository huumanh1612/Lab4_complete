import React, { useRef, useEffect } from 'react';
import FooterLeft from './FooterLeft';
import FooterRight from './FooterRight';
import './VideoCard.css';

const VideoCard = (props) => {
    const { 
        url, 
        username, 
        description, 
        song, 
        likes, 
        shares, 
        comments, 
        saves, 
        profilePic, 
        setVideoRef, 
        isPlaying // Prop để kiểm soát video hiện tại
    } = props;

    const videoRef = useRef(null);

    // Tự động phát/tạm dừng dựa trên trạng thái isPlaying
    useEffect(() => {
        if (isPlaying && videoRef.current) {
            videoRef.current.play();
        } else if (videoRef.current) {
            videoRef.current.pause();
        }
    }, [isPlaying]);

    const onVideoPress = () => {
        if (videoRef.current.paused) {
            videoRef.current.play();
        } else {
            videoRef.current.pause();
        }
    };

    return (
        <div className="video">
            {/* Video element */}
            <video
                className="player"
                onClick={onVideoPress}
                ref={(ref) => {
                    videoRef.current = ref;
                    setVideoRef(ref); // Đăng ký videoRef qua hàm setVideoRef
                }}
                loop
                src={url}
            ></video>
            
            <div className="bottom-controls">
                <div className="footer-left">
                    {/* Phần bên trái của footer */}
                    <FooterLeft 
                        username={username} 
                        description={description} 
                        song={song} 
                    />
                </div>
                <div className="footer-right">
                    {/* Phần bên phải của footer */}
                    <FooterRight 
                        likes={likes} 
                        shares={shares} 
                        comments={comments} 
                        saves={saves} 
                        profilePic={profilePic} 
                        videoRef={videoRef} 
                    />
                </div>
            </div>
        </div>
    );
};

export default VideoCard;
