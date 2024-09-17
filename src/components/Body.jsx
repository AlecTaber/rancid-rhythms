import React from "react";

const Body = ({ section }) => {
switch (section) {
  case "home":
    return (
      <section>
        <h2>Welcome to Rancid Rhythms</h2>
        <p>
            Read and Write reviews for your favorite albums!
        </p>
      </section>
    );

  case "profile":
    return (
      <section>
        <h2>Your Profile</h2>
        <p>
          Here's where you can update your information!
        </p>
      </section>
    );
    
  default:
    return (
      <section>
        <h2>Page Not Found</h2>
        <p>Sorry, the page you're looking for could not be found.</p>
      </section>
    );
}
};

export default Body;