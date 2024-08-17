import React from 'react';
import Card from '../Components/Card';
import Footer from '../Components/Footer';

const languages = [
  { title: 'C++', imgSrc: 'Logo/c++.png', description: 'Learn the basics of C++ programming language. Join community' ,link:"#"},
  { title: 'Python', imgSrc: 'Logo/python.png', description: 'Python is a high-level, interpreted programming language known for its simplicity.',link:"#" },
  { title: 'Java', imgSrc: 'Logo/java.png', description: 'Java is a popular programming language known for its platform independence.',link:"#" }
];

const featuredCourses = [
  { title: 'HTML', imgSrc: 'Logo/html.png', description: 'Learn HTML basics' },
  { title: 'JavaScript Fundamentals', imgSrc: 'Logo/js.png', description: 'Learn the basics of JavaScript programming language.' }
];

export const Home = () => (
  <>
    <section className="hero">
      <h1>Learn, Practice, and Master Programming</h1>
      <p>Start your journey to becoming a coding expert today!</p>
      <button>Get Started</button>
    </section>
    <br />
    <section className="format">
      <h2>Explore Programming Languages</h2>
      <section className="languages">
        {languages.map((lang, index) => (
          <Card
            key={index}
            title={lang.title}
            imgSrc={lang.imgSrc}
            description={lang.description}
            link={lang.link}
            
          />
        ))}
      </section>

      <h2>Featured Courses</h2>
      <section className="featured">
        {featuredCourses.map((course, index) => (
          <Card
            key={index}
            title={course.title}
            imgSrc={course.imgSrc}
            link={course.link}
            description={course.description}
          />
        ))}
      </section>

      <h2>Practice Your Skills</h2>
      <section className="practice">
        <div className="card1">
          <h3>Challenge 1: HTML Basics and Fundamentals</h3>
          <div className="card-info">
            <p>Write HTML code to create a simple webpage.</p>
            <button className="enroll-btn"><a style={{ color: 'white', textDecoration: 'none' }} href="/quiz">Try Now</a></button>
          </div>
        </div>

        <div className="card1">
          <h3>Challenge 2: JavaScript Functions</h3>
          <div className="card-info">
            <p>Implement JavaScript functions to perform basic calculations.</p>
            <button className="enroll-btn"><a style={{ color: 'white', textDecoration: 'none' }} href="/quiz">Try Now</a></button>
          </div>
        </div>
      </section>

      <section className="community">
        <h2>Join Our Community</h2>
        <p>Join our community forums to connect with fellow learners and share your experiences!</p>
        <a href="/addproblem">Add problems</a>
      </section>
    </section>

    <Footer />
  </>
);

export default Home;
