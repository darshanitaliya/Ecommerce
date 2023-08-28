import './About.css'
import { Button, Typography, Avatar } from '@material-ui/core'
import InstagramIcon from '@material-ui/icons/Instagram'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import MetaData from '../metaData'
import pic from '../../../images/person1.png'
const About = () => {
  const visitInstagram = () => {
    window.location = 'https://www.instagram.com/darshan_italiya418/'
  }
  return (
    <div className="aboutSection">
      <MetaData title="About Us" />
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: '10vmax', height: '10vmax', margin: '2vmax 0' }}
              src={pic}
              alt="Founder"
            />
            <Typography>Darshan Italiya</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Instagram
            </Button>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Social Media</Typography>
            <a href="https://github.com/darshanitaliya" target="blank">
              <GitHubIcon className="gitHubSvgIcon" />
            </a>

            <a
              href="https://www.linkedin.com/in/darshan-italiya418/"
              target="blank"
            >
              <LinkedInIcon className="linkdnSvgIcon" />
            </a>
            <a
              href="https://www.instagram.com/darshan_italiya418/"
              target="blank"
            >
              <InstagramIcon className="instagramSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
