import React, { useEffect }from 'react'
import { FaCode, FaSortAmountDown } from "react-icons/fa";
import axios from 'axios';
import ImageSlider from '../../utils/ImageSlider';
import { Carousel } from 'antd';
import  banner_1  from './banner/banner_1.png';
import  banner_2  from './banner/banner_2.jpg';
import  banner_3  from './banner/banner_3.jpg';
import  banner_4  from './banner/banner_4.jpg';
import {Button}from 'antd';
import Footer from '../Footer/Footer';

function LandingPage() {
    const contentStyle = {
          height: '400px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
      };


      const buttonSt = {
          border: "1px solid #364d79",
          color: "#364d79",
          background: "white",
          width : '150px',
          margin:'45px',
      };

    useEffect(() => {
        axios.post('api/product/products')
            .then(response => {
                if (response.data.success) {
                    console.log(response.data);
                } else {
                    alert('fail to load events');
                }
            })
    }, [])
    return (
      <div>
          <Carousel autoplay>
            <div>
            <h3 style={contentStyle}>{ <img style={{width: '100%', height: '400px'}} src={banner_1}/> }</h3>
            
            </div>

            <div>
            <h3 style={contentStyle}> { <img style={{width: '100%', height: '400px'}} src={banner_2}/> }</h3>
           
            </div>

            <div>
            <h3 style={contentStyle}> { <img style={{width: '100%', height: '400px'}} src={banner_3}/> }</h3>
           
            </div>
            
            <div>
            <h3 style={contentStyle}> { <img style={{width: '100%', height: '400px'}} src={banner_4}/> }</h3>
           
            </div>

        </Carousel>
         

        <div style={{ display: 'flex', justifyContent: 'center', marginTop: "2%"}}>
        <h2>Category</h2>
        </div>

        <div  style={{display: 'flex', justifyContent: 'center'}} >
        <Button type="primary" style = {buttonSt}>BUSINESS</Button>  <Button type="primary" style = {buttonSt}>IT</Button>    
        <Button type="primary" style = {buttonSt}>AUTOMOBILE</Button>    <Button type="primary" style = {buttonSt}>MEDIA</Button>     
        <Button type="primary" style = {buttonSt}>OTHERS</Button>
        </div>
      </div>  
 
    );
    
}


export default LandingPage
