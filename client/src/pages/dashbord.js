import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./dashbord.css";
import { IoIosLogOut } from "react-icons/io";
import { BsArrowRight } from "react-icons/bs";


const CheckInOutPage = () => {
  const [username, setUser] = useState("");
  const [position, setPosition] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkOutTime, setCheckOutTime] = useState(null);
  const [history, setHistory] = useState([]);
  const [userId, setUserId] = useState("");
  const [historyId, setHistoryId] = useState("");
  const navigation = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const historyId = localStorage.getItem('historyId');
    if (history) {
      setHistoryId(historyId);
    }
    if (!token) {
      navigation("/");
    }
    const user = JSON.parse(localStorage.getItem("user"));
    if (token) {
      setUser(user.username);
      setPosition(user.position);
      setMobileNumber(user.mobileNumber);
      setEmail(user.email);
      setUserId(user._id);
    }
  }, [navigation]);

  // console.log(historyId);

  const handleCheckIn = async () => {
    const currentTime = new Date();
    setCheckInTime(currentTime.toLocaleTimeString());
    try {
      const res = await axios.post("https://tech-54ds.onrender.com/api/checkin", {
        userId: userId,
        timestamp: currentTime
      });
      const resData = (res.data)
      if (resData.valid) {
        localStorage.setItem("historyId", resData.check._id);
        setHistoryId(resData.check._id);
        alert("You have been marked successfully!");
        // setIsCheckedIn(true); // Update check-in status
      }
    } catch (error) {
      console.error("Error recording check-in:", error);
    }
  };

  const handleCheckOut = async () => {
    const currentTime = new Date();
    setCheckOutTime(currentTime.toLocaleTimeString());
    try {
      console.log(historyId);
      const response = await axios.post("https://tech-54ds.onrender.com/api/checkout", {
        historyId: historyId,
        timestamp: currentTime
      });
      const check = response.data.check; // Ensure response.data.check is not null
      if (check && check.checkoutTime) {
        setHistoryId(null)
        localStorage.removeItem('historyId')
        alert(" You have been Checked-out Successfully!");

        // setCheckOutTime(check.checkoutTime);
      } else {
        console.error("Error recording check-out: No valid checkout time found.");
      }
    } catch (error) {
      console.error("Error recording check-out:", error);
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  const handleHistoryClick = () => {
    navigation("/history", {
      state: {
        id: userId,
      },
    });
  };

  return (
    <div className="container">
      <div className="slider">
        <button type="button" className="btn mt-5" data-bs-toggle="modal" data-bs-target="#exampleModal">
          <i className="bi bi-list"></i>
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">{username}</h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p>Designation :- {position} </p>
                <p>Phone No. :- {mobileNumber}</p>
                <p>Email :- {email}</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="log-out" data-bs-dismiss="modal" onClick={handleLogout}>
                  Logout {"\t"}
                  <IoIosLogOut />
                </button>
              </div>
            </div>
          </div>
        </div>

        <img src="/attendanceImage/image 1.svg" alt="" style={{ width: "144px", height: "auto" }} className="image" />
      </div>

      <div className="head">
        <h2 className="PersonName">Hi!<br />{username}</h2>
        <p className="fParra">Have a nice day.</p>
      </div>

      <div className="d-flex justify-content-center">
        <div >
          <div className="button">
            {historyId ? (
              <div className="buttonout d-flex justify-content-center">
                <button type="button" className="butn active" onClick={handleCheckOut}>Check Out</button>
              </div>
            ) : (
              <div className="buttonPresent justify-content-center  d-flex">
                <button type="button" className="btn active" onClick={handleCheckIn}>Present</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="buttonHistory d-flex justify-content-center">
        <button onClick={handleHistoryClick} type="button" className="btn active">History <BsArrowRight /></button>
      </div>
    </div>
  );
}

export default CheckInOutPage;