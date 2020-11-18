import React, { useEffect }from 'react'
import { FaCode, FaSortAmountDown } from "react-icons/fa";
import axios from 'axios';
import ImageSlider from '../../utils/ImageSlider';
import { Carousel } from 'antd';
import { banner_1 } from './banner/banner_1.png';
import {Button}from 'antd';

function LandingPage() {
    const contentStyle = {
        height: '400px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
      };


      const buttonSt = {
          width : '55px'
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
            <h3 style={contentStyle}>1</h3>
            {/* <img style={{width: '100%', height: '400px'}} src={banner_1}/> */}
            </div>
            <div>
            <h3 style={contentStyle}>2</h3>
            </div>
            <div>
            <h3 style={contentStyle}>3</h3>
            </div>
            <div>
            <h3 style={contentStyle}>4</h3>
            </div>
        <div>
 
         </div>
        

        </Carousel>
        <div>
        <Button type="primary" style = {buttonSt}>music</Button>  <Button type="primary" style = {buttonSt}>science</Button>    <Button type="primary" style = {buttonSt}>computer</Button>    <Button type="primary" style = {buttonSt}>menu1</Button>     <Button type="primary" style = {buttonSt}>menu2</Button>
        </div>
        
      </div>  

    );
    
}


export default LandingPage
