import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoPlayCircleSharp } from "react-icons/io5";
import { AiOutlinePlus } from "react-icons/ai";
import { RiThumbUpFill, RiThumbDownFill } from "react-icons/ri";
import { BsCheck } from "react-icons/bs";
import axios from "axios";
// import { onAuthStateChanged } from "firebase/auth";
// import { firebaseAuth } from "../utils/firebase-config";
import { useDispatch } from "react-redux";
import { removeMovieFromLiked } from "../store";
import video from "../assets/Video_normal.mp4";
import "./Card.css"; // Importing the CSS file

export default React.memo(function Card({
  index,
  movieData,
  isLiked = false,
  showTitle = false,
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const [email, setEmail] = useState(undefined);

  const handleImageClick = () => {
    navigate(`/movie/${movieData.id}`, { state: { movie: movieData } });
  };

  const handlevideoClick = () => {
    navigate(`/player/${movieData.id}`, { state: { movie: movieData } });
  };

  const userEmail = localStorage.getItem("email");
  const addToList = async () => {
    try {
      await axios.post("http://localhost:8080/api/users/add", {
        userEmail,
        data: movieData,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="image-container"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {showTitle && <div className="">{movieData.name}</div>}
      <img
        src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
        alt="card"
        className="image"
        onClick={handleImageClick}
      />

      {isHovered && (
        <video className="video" src={video} autoPlay={true} loop muted />
      )}
      <div className="overlay">
        <div className="text">
          <div className="title">
            <h3>{movieData.name}</h3>
          </div>

          <div className="controls">
            <IoPlayCircleSharp
              className="icon"
              onClick={handlevideoClick}
              title="Play"
            />
            <RiThumbUpFill className="icon" title="Like" />
            <RiThumbDownFill className="icon" title="Dislike" />
            {isLiked ? (
              <BsCheck
                title="Remove from List"
                className="icon"
                onClick={() =>
                  dispatch(
                    removeMovieFromLiked({
                      movieId: movieData.id,
                      email: userEmail,
                    })
                  )
                }
              />
            ) : (
              <AiOutlinePlus
                className="icon"
                title="Add to my list"
                onClick={addToList}
              />
            )}
          </div>
        </div>
      </div>
    </div>
    // <div
    //   className="card-container"
    //   onMouseEnter={() => setIsHovered(true)}
    //   onMouseLeave={() => setIsHovered(false)}
    // >
    //   {/* {isHovered && (
    //     <img
    //       src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
    //       alt="card"
    //       onClick={() => navigate("/player")}
    //     />
    //   )} */}

    //   {
    //     <div className="">
    //       <div className="">
    //         <img
    //           src={`https://image.tmdb.org/t/p/w500${movieData.image}`}
    //           alt="card"
    //           onClick={() => navigate("/moviedetails")}
    //         />
    //       </div>
    //       <div className="info-container flex column">
    //         <h3 className="name" onClick={() => navigate("/player")}>
    //           {movieData.name}
    //         </h3>
    //         <div className="icons flex j-between">
    //           <div className="controls flex">
    //             <IoPlayCircleSharp
    //               title="Play"
    //               onClick={() => navigate("/player")}
    //             />
    //             <RiThumbUpFill title="Like" />
    //             <RiThumbDownFill title="Dislike" />
    //             {isLiked ? (
    //               <BsCheck
    //                 title="Remove from List"
    //                 onClick={() =>
    //                   dispatch(
    //                     removeMovieFromLiked({ movieId: movieData.id, email })
    //                   )
    //                 }
    //               />
    //             ) : (
    //               <AiOutlinePlus title="Add to my list" onClick={addToList} />
    //             )}
    //           </div>
    //           <div className="info">
    //             <BiChevronDown title="More Info" />
    //           </div>
    //         </div>
    //         <div className="genres flex">
    //           <ul className="flex">
    //             {movieData.genres.map((genre) => (
    //               <li key={genre}>{genre}</li>
    //             ))}
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //   }
    // </div>
  );
});
