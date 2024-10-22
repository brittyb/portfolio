import React, { useEffect, useState, useRef } from 'react';
import logo from './logo.svg';
import './App.css';

function setActive(element){
  // Remove active class from all links

  var links = document.querySelectorAll('.topnav a');
  links.forEach(function(link) {
      link.classList.remove('active');
  });

  // Add active class to the clicked link
  element.classList.add('active');
}

const useScrollToTarget = () => {
  const [scrolledToTarget, setScrolledToTarget] = useState(false);
  const sectionRef = useRef(null);
  

  const handleScroll = () => {
    if (!sectionRef.current) return;

    const sectionRect = sectionRef.current.getBoundingClientRect();
    
    // Compare scrollY with component scrollY
  
    if (sectionRect.top > -150 && sectionRect.top < window.innerHeight) {
      setScrolledToTarget(true);
    } else {
      setScrolledToTarget(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return [scrolledToTarget, sectionRef];
};

const useScrollToSection = () => {
  
  const [scrolledToTarget, setScrolledToTarget] = useState(false);
  const sectionRef = useRef(null);
  

  const handleScroll = () => {
    if (!sectionRef.current) return;

    const sectionRect = sectionRef.current.getBoundingClientRect();
    
    console.log(sectionRef);
    console.log(sectionRect.top);
    if (sectionRect.top < 400 && sectionRect.top > 200) {
      setScrolledToTarget(true);
    } else {
      setScrolledToTarget(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return [scrolledToTarget, sectionRef];
};

const SectionTitle = (props) => {
  // State to track whether the scroll position has reached the target point
  
  const [scrolledToTarget, sectionRef] = useScrollToTarget();
  const [scrolledToSection, sectionRef2] = useScrollToSection();
  useEffect(() => {

    if (scrolledToSection && props.name) {
      const name = props.name.toLowerCase();
      const sectionLink = document.getElementById(`${name}Link`);
      if (sectionLink) {
        setActive(sectionLink);
      } else {
        console.log(`Element with ID ${name}Link not found`);
      }
    }
  }, [scrolledToSection]);

  
  return (
    <div ref={sectionRef} id={`${props.name}Heading`}  className={`section-title-div ${scrolledToTarget ? 'foreground-opacity' : 'background-opacity'}`}>
      <h3 ref={sectionRef2} className={`${props.name}Title section-title`}>{props.name}</h3>
    </div>
  );
};





function Skill(props){
  const [scrolledToTarget, sectionRef] = useScrollToTarget();
  return (
    <>
      <div ref={sectionRef} className={`skill-div ${scrolledToTarget ? 'foreground-opacity' : 'background-opacity'}`}>
        <img className="skill-image" src={props.link}></img>
        <h3 className="skill-name" >{props.name}</h3>
      </div>
    </>
  );
  
}

function SmallSectionTitle(props){
  const [scrolledToTarget, sectionRef] = useScrollToTarget();
  return (
    <>
      <div ref={sectionRef} className={`small-section-div ${scrolledToTarget ? 'foreground-opacity' : 'background-opacity'}`}>
      <h3 className="small-section-title">{props.name}</h3>
      </div>
    </>
  );
  
}

function Course(props){
  const [scrolledToTarget, sectionRef] = useScrollToTarget();
  return (
    <>
      <div ref={sectionRef} className={`course-div ${scrolledToTarget ? 'foreground-opacity' : 'background-opacity'}`}>
        <h3 className="course-name">{props.name}</h3>
      </div>
    </>
  );
}

function Project(props){
  const [scrolledToTarget, sectionRef] = useScrollToTarget();
  return (
    <>
     <div ref={sectionRef} className={`project-div ${scrolledToTarget ? 'foreground-opacity' : 'background-opacity'}`}>
        <h3 className="project-name">{props.name}</h3>
        {props.imagePath && (
          <img className="screenshot-image"src={process.env.PUBLIC_URL + props.imagePath}></img>
            )}
        
        <p className="project-description">{props.description}</p>
        <a className="image-link" href={props.link} target="_blank">
          <button className="link-button">
            <img src="https://cdn0.iconfinder.com/data/icons/shift-logotypes/32/Github-512.png" className="link-image"></img>
            
          </button>
        </a>
      </div>
    </>
  );
}

function App() {
  return (
    <div className="App">
      <div class="topnav">
      <a id="aboutLink" class="active" href="#about" onclick="setActive(this)">About</a>
      <a id="skillsLink" href="#skills" onclick="setActive(this)">Skills</a>
      <a id="projectsLink" href="#projects" onclick="setActive(this)">Projects</a>
      <a id="resumeLink" href="#resume" onclick="setActive(this)">Resume</a>
      <a id="contactLink" href="#contact" onclick="setActive(this)">Contact</a>
    </div>
    <div id="about"></div>
    

    
    <div id="about" class="home">
      <img
        src="https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg"
        alt="img"
        class="pfp"
      />

      <div class="description">
        <h1>Brittany Barnes</h1>
        <h2>
          Hi, I'm <b>Brittany</b>. I'm a computer science student at Drexel University
        </h2>
      </div>
    </div>

    <SectionTitle name="about"></SectionTitle>
  
      <div id="skills" className="skills section-div">
      <SectionTitle name="Skills"/>
      
      <div className="row">
      <Skill name="React" link="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/2300px-React-icon.svg.png"></Skill>
      <Skill name="Java" link="https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg"></Skill>
      <Skill name="Firebase" link="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Firebase_icon.svg/2048px-Firebase_icon.svg.png"></Skill>
      </div>
      <div className="row">
      <Skill name="SQL" link="https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png"></Skill>
      <Skill name="C" link="https://upload.wikimedia.org/wikipedia/commons/thumb/1/18/C_Programming_Language.svg/926px-C_Programming_Language.svg.png"></Skill>
      <Skill name="Kotlin" link="https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Kotlin_Icon.png/1200px-Kotlin_Icon.png"></Skill>

      </div>

      <div className="row">
        <Skill name="Git" link="https://git-scm.com/images/logos/downloads/Git-Icon-1788C.png"></Skill>
        <Skill name="Python" link="https://i.pinimg.com/originals/82/a2/18/82a2188c985ce75402ae44fc43fe7e5e.png"></Skill>
        <Skill name="MIPS" link="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDZxkoYfqOY6Jbr90GI-u9CxuBv9NxtQA3fjG5H8gNFjrJbdPTxWUeVmIUjBC92CTkZzA&usqp=CAU"></Skill>
      
        
      </div>
      <SmallSectionTitle name="Relevant Coursework"></SmallSectionTitle>
      <Course name="Data Structures and Algorithms"></Course>
      <Course name="Software Architecture"></Course>
      <Course name="Artificial Intelligence"></Course>
      <Course name="Introduction to Software Engineering and Development"></Course>
      <Course name="Mathematical Foundations of Computer Science"></Course>
      <Course name="Advanced Programming Techniques"></Course>

      <Course name="Introduction to Computer Engineering"></Course>
      </div>

      <div id="projects" className="projects section-div">

      

      <SectionTitle name="Projects" />
      
      </div>
      
      <div className="row">
        <Project name="Scrapbook" description="A website that lets couples document the dates they had together. Utilizes Google Gemini API
         to recommend them date ideas with AI. Create dates with titles, images, dates, and descriptions to search for them and add them to albums. 
         I was primarily responsible for the JavaScript and Firebase functionality, but I also
         created HTML and CSS. " imagePath="/scrapbook.png"></Project>
         
        <Project name="Escape from the Zeller Cellar" description="A web-based escape room game. Escape from the evil wizard Zeller's
         mysterious cellar. Race against the clock, gather clues, and use the objects you find to escape the Zeller Cellar. 
         I contributed to the HTML, CSS, Java Servlets, and SQL queries of this project. Each action saves the state of the game 
        in a SQL database" link="https://github.com/hgrimm000/ZellerCellar"
        imagePath="/zeller-cellar.png"></Project>
        
      </div>

      <div className="row">
        <Project name="Creative Commissions" description="Android app that lets art patrons find digital artists to commission. 
        Built using Android Studio, Kotlin, and Firebase. Search for artists through commission posts and request commissions." link="https://github.com/brittyb/CreativeComms"></Project>
        <Project name="OpenGL Room" description="A room created using OpenGL that lets you walk around, change the tv channel, move the blinds
        , turn on the table light, and look in the mirror. 3d models made in blender." link="https://github.com/brittyb/CS370-Fall2022"
        imagePath="/graphics-project.png"></Project>
      </div>

      <div id="resume" className="resume section-div">
        <SectionTitle name="Resume"/>
        <a href="Resume April 2024.pdf" target="_blank"><button>View</button></a>
        <a href="Resume April 2024.pdf" download="Resume Brittany Barnes"><button>Download</button></a>

      </div>
      
      <div id="contact" className="contact section-div">
      <SectionTitle name="Contact" />
      <div className="contact-div"></div>
      <form action="https://api.web3forms.com/submit" method="POST">
        <h3>Leave me a message...</h3>
        
        <input  type="hidden" name="access_key" value="f74c5a50-ff70-411e-b3be-91dd11fdec8a"></input>
        <input type="text" name="name" placeholder="Your Name" className="contact-inputs" required></input>
        <input  type="email" name="email" placeholder="Your Email" className="contact-inputs" required></input>
        <textarea name="message" placeholder="Your Message" className="contact-inputs" required></textarea>
        <button type="submit">Submit</button>
        
      </form>
      
      </div>

    </div>
  );
}

export default App;
