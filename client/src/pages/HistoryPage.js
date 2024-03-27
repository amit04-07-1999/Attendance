import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './HistoryPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLessThan } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { IoIosLogOut } from "react-icons/io";





function History() {

  const [username, setUser] = useState("");
  const [position, setPosition] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");


  const location = useLocation();
  const [history, setHistory] = useState([]);
  const userId = location.state?.id;
  // console.log(history);
  useEffect(() => {
    axios.get("http://localhost:3001/api/history?id=" + userId).then(r => {
      const isValid = r.data.valid
      if (isValid) {
        setHistory(r.data.history);
      }
    }).catch((err) => {
      console.error(err);
    })
    const token = localStorage.getItem("token");
    const user = JSON.parse(localStorage.getItem("user"));
    if (token) {
      setUser(user.username);
      setPosition(user.position);
      setMobileNumber(user.mobileNumber);
      setEmail(user.email);
    }
  }, [fetch,])

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="container py-2">
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

      <div className="d-flex justify-content-between slider">
        <div className="mt-4">
          <h2 className="PersonName">History</h2>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Check-in</th>
            <th scope="col">Check-out</th>
          </tr>
        </thead>
        <tbody>
          {history &&
            history.map((entry, index) => (
              <tr key={index}>
                <td>{new Date(entry.createdAt).toLocaleDateString()}</td>
                <td>{entry.checkinTime ? new Date(entry.checkinTime).toLocaleTimeString() : "-"}</td>
                <td>{entry.checkoutTime ? new Date(entry.checkoutTime).toLocaleTimeString() : "-"}</td>
              </tr>
            ))}
        </tbody>
      </table>


      <div className="arrow">
        <Link to="/dashboard" className="d-flex align-items-center text-light">
          <FontAwesomeIcon icon={faLessThan} />
        </Link>
      </div>
    </div >
  );
}

export default History;
