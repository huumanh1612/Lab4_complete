import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faCirclePlus, 
    faCircleCheck, 
    faHeart, 
    faCommentDots, 
    faBookmark, 
    faShare, 
    faVolumeMute, 
    faVolumeUp 
} from '@fortawesome/free-solid-svg-icons';
import './FooterRight.css';

function FooterRight({ likes, comments, saves, shares, profilePic, videoRef }) {
    const [liked, setLiked] = useState(false);
    const [saved, setSaved] = useState(false);
    const [muted, setMuted] = useState(false);
    const [showSharePopup, setShowSharePopup] = useState(false); // Trạng thái hiển thị popup chia sẻ

    // Xử lý mute/unmute video
    const handleMuteClick = () => {
        if (videoRef.current) {
            videoRef.current.muted = !muted;
            setMuted((prevMuted) => !prevMuted);
        }
    };

    // Xử lý lưu và sao chép URL
    const handleSaveClick = () => {
        if (videoRef.current) {
            const videoUrl = videoRef.current.src; // Lấy URL của video
            navigator.clipboard.writeText(videoUrl) // Sao chép URL vào clipboard
                .then(() => {
                    alert('Video URL copied to clipboard!'); // Thông báo thành công
                })
                .catch((err) => {
                    console.error('Failed to copy: ', err);
                });
            setSaved(true); // Đánh dấu đã lưu
        }
    };

    // Mở/đóng popup chia sẻ
    const toggleSharePopup = () => {
        setShowSharePopup((prev) => !prev);
    };

    return (
        <div className="footer-right">
            <div className="sidebar-icon">
                <img
                    src={profilePic}
                    className="userprofile"
                    alt="Profile"
                    style={{ width: '45px', height: '45px' }}
                />
            </div>

            <div className="sidebar-icon">
                <FontAwesomeIcon
                    icon={faHeart}
                    style={{
                        width: '35px',
                        height: '35px',
                        color: liked ? '#FF0000' : 'white',
                    }}
                    onClick={() => setLiked(!liked)}
                />
                <p>{likes + (liked ? 1 : 0)}</p>
            </div>

            <div className="sidebar-icon">
                <FontAwesomeIcon
                    icon={faCommentDots}
                    style={{ width: '35px', height: '35px', color: 'white' }}
                />
                <p>{comments}</p>
            </div>

            <div className="sidebar-icon">
                <FontAwesomeIcon
                    icon={faBookmark}
                    style={{
                        width: '35px',
                        height: '35px',
                        color: saved ? '#ffc107' : 'white',
                    }}
                    onClick={handleSaveClick}
                />
                <p>{saves}</p>
            </div>

            <div className="sidebar-icon">
                <FontAwesomeIcon
                    icon={faShare}
                    style={{ width: '35px', height: '35px', color: 'white' }}
                    onClick={toggleSharePopup} // Hiển thị popup chia sẻ
                />
                <p>{shares}</p>
            </div>

            <div className="sidebar-icon">
                <FontAwesomeIcon
                    icon={muted ? faVolumeMute : faVolumeUp}
                    style={{ width: '35px', height: '35px', color: 'white' }}
                    onClick={handleMuteClick}
                />
                <p>{muted ? 'Muted' : 'Unmuted'}</p>
            </div>

            {/* Popup chia sẻ */}
            {showSharePopup && (
                <div className="share-popup">
                    <div className="share-popup-content">
                        <button className="close-button" onClick={toggleSharePopup}>✖</button>
                        <h3>Share this video</h3>
                        <button className="share-option">Share to Facebook</button>
                        <button className="share-option">Share to Instagram</button>
                        <button className="share-option">Share to Thread</button>
                        <button className="share-option" onClick={handleSaveClick}>Copy Link</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FooterRight;
