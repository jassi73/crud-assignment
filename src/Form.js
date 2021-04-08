import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import axios from "axios";

import "react-datepicker/dist/react-datepicker.css";

function Form() {
  const [number, setNumber] = useState();

  const [recdata, setrecdata] = useState([]);
  useEffect(() => {
    axios({
      method: "get",
      url: "https://60644181f0919700177854b2.mockapi.io/mockdemo/employee",
    })
      .then((res) => setrecdata(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setNumber(value);
  };
  const [character, setCharacter] = useState();

  const symbolChange = (event) => {
    const value = event.target.value.replace(/[^\w\s]/gi, "");
    setCharacter(value);
  };

  const [startDate, setStartDate] = useState(new Date());
  const [imgurl, setimgurl] = useState("");

  const [data, setdata] = useState({});
  const [edittrue, setedittrue] = useState(false);
  const [editid, seteditid] = useState(0);

  function submitHandler() {
    const payload = {
      fullName: data.fullName,
      avatar: imgurl,
      address: "Bangalore",
      phoneNumber: data.phoneNumber,
      email: data.email,
      dob: startDate,
    };
    axios({
      method: "POST",
      url: "https://60644181f0919700177854b2.mockapi.io/mockdemo/employee",
      data: payload,
    })
      .then((res) => {
        alert("data creted");
        axios({
          method: "get",
          url: "https://60644181f0919700177854b2.mockapi.io/mockdemo/employee",
        })
          .then((res) => setrecdata(res.data))
          .catch((err) => console.log(err));
      })
      .catch((err) => alert("got an error while posting data"));
  }

  function editbtnclick(id) {
    seteditid(id);
    setedittrue(true);
    setimgurl("");
    setdata({});
    setStartDate("");
  }

  function editsubmitHandler() {
    const payload = {
      fullName: data.fullName,
      avatar: imgurl,
      address: "Bangalore",
      phoneNumber: data.phoneNumber,
      email: data.email,
      dob: startDate,
    };
    axios({
      method: "put",
      url: `https://60644181f0919700177854b2.mockapi.io/mockdemo/employee/${editid}`,
      data: payload,
    })
      .then((res) => alert("data updated"))
      .catch((err) => alert("got an error while posting data"));
  }

  function onChangeHandler(event) {
    const name = event.target.name;
    const value = event.target.value;
    setdata({
      ...data,
      [name]: value,
    });
  }

  function deleteHandler(id) {
    axios({
      method: "delete",
      url: `https://60644181f0919700177854b2.mockapi.io/mockdemo/employee/${id}`,
    })
      .then((res) => alert("data deleted successfully"))
      .catch((err) => alert("got an error while deleting data"));
  }

  return (
    <div class="form-cotainer">
      {!edittrue && (
        <React.Fragment>
          <div class="form">
            <h3>POST FORM</h3>
          </div>

          <form class="form-element">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                value={character}
                name="fullName"
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                className="form-control"
                value={number}
                name="phoneNumber"
                onChange={(e) => onChangeHandler(e)}
                placeholder="Phone Number"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                name="email"
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
            <div className="form-group">
              <label>Date Of Birth</label>
              <DatePicker
                className="form-control"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter image url"
                onChange={(e) => setimgurl(e.target.value)}
              />
            </div>
            <img
              className="pre-img"
              {...(imgurl.length
                ? { src: `${imgurl}`, className: "show-image" }
                : "")}
              width="100"
              height="100"
            />
          </form>
          <div>
            <button type="submit" onClick={submitHandler}>
              Submit
            </button>
          </div>
        </React.Fragment>
      )}
      {edittrue && (
        <React.Fragment>
          <div class="form">
            <h3>EDIT FORM</h3>
          </div>

          <form class="form-element">
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="First name"
                value={character}
                name="fullName"
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                className="form-control"
                value={number}
                name="phoneNumber"
                onChange={(e) => onChangeHandler(e)}
                placeholder="Phone Number"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter Email"
                name="email"
                onChange={(e) => onChangeHandler(e)}
              />
            </div>
            <div className="form-group">
              <label>Date Of Birth</label>
              <DatePicker
                className="form-control"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
              />
            </div>
            <div className="form-group">
              <label>Image</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter image url"
                onChange={(e) => setimgurl(e.target.value)}
              />
            </div>
            <img
              className="pre-img"
              {...(imgurl.length
                ? { src: `${imgurl}`, className: "show-image" }
                : "")}
              width="100"
              height="100"
            />
          </form>
          <div>
            <button type="submit" onClick={editsubmitHandler}>
              Submit
            </button>
          </div>
        </React.Fragment>
      )}

      {recdata.map((item, id) => {
        return (
          <div className="show-data">
            <span>{item.fullName}</span>
            <span>{item.email}</span>
            <span onClick={() => deleteHandler(item.id)}>
              <button
                onClick={() => item.id}
                onClick={() => editbtnclick(item.id)}
              >
                delete
              </button>
            </span>
            <span>
              <button
                onClick={() => item.id}
                onClick={() => editbtnclick(item.id)}
              >
                Edit
              </button>
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default Form;
