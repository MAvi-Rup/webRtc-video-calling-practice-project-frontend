import React from "react";

const HomePage = () => {
  return (
    <div className="container mt-5" style={{ height: "100vh" }}>
      <div className="row">
        <h4 className="text-center">Video Calling Application</h4>
        <div className="col-6 m-auto">
          <input
            className="form-control mb-2"
            type="button"
            value=""
            placeholder="Email"
          />
          <input
            className="form-control mb-2"
            type="button"
            value=""
            placeholder="Enter Room Code"
          />
          <button className="btn btn-primary text-center">Enter Room</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
