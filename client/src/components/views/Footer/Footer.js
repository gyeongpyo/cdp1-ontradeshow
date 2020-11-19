import React from 'react'
import {Icon} from 'antd';
import {Button}from 'antd';
import {Link} from 'react-router-dom';
import autoin_logo from '../NavBar/autoin_logo.png';
import './design/Footer.css';

function Footer() {
    return (
        <div className='footer-container'>
        <section className='footer-subscription'>
          <p className='footer-subscription-heading'>
          Join the Autoin newsletter to receive our latest exhibitions
          </p>
          <p className='footer-subscription-text'>
            You can unsubscribe at any time.
          </p>
          <div className='input-areas'>
            <form>
              <input
                className='footer-input'
                name='email'
                type='email'
                placeholder='Type Your Email'
              />
              <Button buttonStyle='btn--outline'>Subscribe</Button>
            </form>
          </div>
        </section>
        <div class='footer-links'>
          <div className='footer-link-wrapper'>
            <div class='footer-link-items'>
              <h2>About Us</h2>
              <Link to='/sign-up'>How it works</Link>
              <Link to='/sign-up'>Testimonials</Link>
              <Link to='/sign-up'>Careers</Link>
              <Link to='/sign-up'>Investors</Link>
              <Link to='/sign-up'>Terms of Service</Link>
            </div>
            <div class='footer-link-items'>
              <h2>Contact Us</h2>
              <Link to='/sign-up'>Contact</Link>
              <Link to='/sign-up'>Support</Link>
              <Link to='/sign-up'>Destinations</Link>
              <Link to='/sign-up'>Sponsorships</Link>
            </div>
          </div>
          <div className='footer-link-wrapper'>
            <div class='footer-link-items'>
              <h2>Videos</h2>
              <Link to='/sign-up'>Submit Video</Link>
              <Link to='/sign-up'>Ambassadors</Link>
              <Link to='/sign-up'>Agency</Link>
              <Link to='/sign-up'>Influencer</Link>
            </div>
            <div class='footer-link-items'>
              <h2>Social Media</h2>
              <Link to='/sign-up'>Instagram</Link>
              <Link to='/sign-up'>Facebook</Link>
              <Link to='/sign-up'>Youtube</Link>
              <Link to='/sign-up'>Twitter</Link>
            </div>
          </div>
        </div>
        <section class='social-media'>
          <div class='social-media-wrap'>

            

            <div class='social-icons'>
              <Link
                class='social-icon-link facebook'
                to='/'
                target='_blank'
                aria-label='Facebook'
              >
                <i class='fab fa-facebook-f' />
              </Link>
              <Link
                class='social-icon-link instagram'
                to='/'
                target='_blank'
                aria-label='Instagram'
              >
                <i class='fab fa-instagram' />
              </Link>
              <Link
                class='social-icon-link youtube'
                to='/'
                target='_blank'
                aria-label='Youtube'
              >
                <i class='fab fa-youtube' />
              </Link>
              <Link
                class='social-icon-link twitter'
                to='/'
                target='_blank'
                aria-label='Twitter'
              >
                <i class='fab fa-twitter' />
              </Link>
              <Link
                class='social-icon-link twitter'
                to='/'
                target='_blank'
                aria-label='LinkedIn'
              >
                <i class='fab fa-linkedin' />
              </Link>

              
            </div>
          </div>
        </section>

        <div style={{display: 'flex', justifyContent: 'center'}}>
            <div class='footer-logo'>
              <Link to='/' className='social-logo'>
                <img src={autoin_logo}
                style={{width: '75px', height: '30px'}}/>
                <i class='fab fa-typo3' />
              </Link>
            </div>
            &nbsp; &nbsp;
            <div style={{ marginTop: "2%"}}>
            <small class='website-rights'>Autoin © 2020</small>
            </div>
        </div>

      </div>
    );
      /*  <div className='footer-container'>
            <section className='footer-subscription'>
                <p className='footer-subscription-heading'>
                    Join the Autoin newsletter to receive our latest exhibitions
                </p>
                <p className='footer=subscription-text'>
                    unsubscribe can be done anytime!
                </p>
                <div className='input-areas'>
                    <form>
                        <input
                            type='email'
                            name='email'
                            placeholder='Your Email'
                            className='footer-input'
                        />
                        <Button Buttonstyle="primary" >Subscribe</Button>
                    </form>
                </div>

            </section>

        </div>
    )*/
}

export default Footer
