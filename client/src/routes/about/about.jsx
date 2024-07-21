import "./about.scss";

function About() {
  return (
    <div className="aboutPage">
      <div className="header">
        <h1>About VueEstate</h1>
      </div>
      <div className="content">
        <div className="section">
          <h2>Our Mission</h2>
          <p>
            At VueEstate, our mission is to simplify the process of buying,
            selling, and renting properties. We strive to provide the best user
            experience with our comprehensive property listings and advanced
            search features.
          </p>
        </div>
        <div className="section">
          <h2>Our Story</h2>
          <p>
            Founded in 2023, VueEstate started as a small project with a big
            vision. Our team of dedicated professionals works tirelessly to
            bring you the most accurate and up-to-date real estate information.
          </p>
        </div>
        <div className="section">
          <h2>Our Values</h2>
          <p>
            Integrity, transparency, and customer satisfaction are at the core
            of everything we do. We believe in building lasting relationships
            with our clients by providing reliable and trustworthy services.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
