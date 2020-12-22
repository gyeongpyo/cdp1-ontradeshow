import React, { useEffect }from 'react'
import { FaCode, FaSortAmountDown } from "react-icons/fa";
import axios from 'axios';
import ImageSlider from '../../utils/ImageSlider';
import { Carousel } from 'antd';
import  banner_1  from './banner/banner_1.png';
import  banner_2  from './banner/banner_2.jpg';
import  banner_3  from './banner/banner_3.jpg';
import  banner_4  from './banner/banner_4.jpg';
import {Button} from 'antd';
import Footer from '../Footer/Footer';
import {useHistory} from "react-router";
import { IdcardOutlined } from '@ant-design/icons';
import { DesktopOutlined } from '@ant-design/icons';
import { CarOutlined } from '@ant-design/icons';
import { PlaySquareOutlined } from '@ant-design/icons';
import { AndroidOutlined } from '@ant-design/icons';
import { EllipsisOutlined } from '@ant-design/icons';




function LandingPage(props) {
    const history = useHistory();
    

const IdcardOutlinedst = {border: "white", //1px solid #364d79
color: "#F39932",
background: "white",
width : '150px',
margin:'45px',
fontSize: '32px',
};

const DesktopOutlinedst = {border: "white", //1px solid #364d79
color: "#774E9B",
background: "white",
width : '150px',
margin:'45px',
fontSize: '32px',
};

const CarOutlinedst = {border: "white", //1px solid #364d79
color: "#24AAE4",
background: "white",
width : '150px',
margin:'45px',
fontSize: '32px',
};

const PlaySquareOutlinedst = {border: "white", //1px solid #364d79
color: "#F90303",
background: "white",
width : '150px',
margin:'45px',
fontSize: '32px',
};
const AndroidOutlinedst = {border: "white", //1px solid #364d79
color: "#A3EA64",
background: "white",
width : '150px',
margin:'45px',
fontSize: '32px',
};

const EllipsisOutlinedst = {border: "white", //1px solid #364d79
color: "#364d79",
background: "white",
width : '150px',
margin:'45px',
fontSize: '32px',
};

const icons = {border: "white", //1px solid #364d79
color: "#364d79",
background: "white",
width : '150px',
margin:'45px',
fontSize: '32px',
 
};

    const buttonSt = {
        border: "white", //1px solid #364d79
        color: "#364d79",
        background: "white",
        width : '150px',
        margin:'45px',
    };
    const sss = {
      
      margin :'3%',

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

    const categoryButtonHandler = (category) => {

      history.push({
        pathname: '/event/search',
        //search: `?query=${category}`
        state: {category: category}
      });
    }

    return (
      <div>
          <Carousel autoplay>
            <div>
            <h3>{ <img style={{width: '100%', height: '100%'}} src={banner_1}/> }</h3>
            </div>

            <div>
            <h3> { <img style={{width: '100%', height: '100%'}} src={banner_2}/> }</h3>
            </div>

            <div>
            <h3> { <img style={{width: '100%', height: '100%'}} src={banner_3}/> }</h3>
            </div>
            
            <div>
            <h3> { <img style={{width: '100%', height: '100%'}} src={banner_4}/> }</h3>
            </div>

        </Carousel>
         

        <div style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'left', marginTop: "2%"}}>
<<<<<<< HEAD
        <h1> &nbsp;&nbsp;&nbsp;&nbsp;가장 인기있는 카테고리</h1>
        </div>
        <div style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'left'}}>
        <label style={{ color: "#8d8d8d"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;관심지수가 가장 높은 인기 카테고리는 여기서 찾아보세요! {' '}  </label> 
        </div>
<div  style={{display: 'flex', justifyContent: 'center',}} >

        <IdcardOutlined type="primary" style = {IdcardOutlinedst} onClick={() => categoryButtonHandler(1)}><IdcardOutlined style={{color: "#123d79" }} /> BUSINESS</IdcardOutlined>  
        <DesktopOutlined type="primary" style = {DesktopOutlinedst} onClick={() => categoryButtonHandler(2)}><DesktopOutlined style={{color: "#123d79" }} />IT</DesktopOutlined>    
        <CarOutlined type="primary" style = {CarOutlinedst} onClick={() => categoryButtonHandler(3)}><CarOutlined style={{color: "eb2f96" }} />AUTOMOBILE</CarOutlined>    
        <PlaySquareOutlined type="primary" style = {PlaySquareOutlinedst} onClick={() => categoryButtonHandler(4)}><PlaySquareOutlined style={{color: "#364d79" }} />MEDIA</PlaySquareOutlined> 
        <AndroidOutlined type="primary" style = {AndroidOutlinedst} onClick={() => categoryButtonHandler(4)}><AndroidOutlined style={{color: "#364d79" }} />MOBILE</AndroidOutlined>    
        <EllipsisOutlined type="primary" style = {EllipsisOutlinedst} onClick={() => categoryButtonHandler()}><EllipsisOutlined style={{color: "#364d79" }} />OTHERS</EllipsisOutlined>

        </div>
        <div  style={{display: 'flex', justifyContent: 'center',marginTop: "-4%"}} >
=======
        <h1> &nbsp;&nbsp;&nbsp;&nbsp;Category</h1>
        </div>
        <div style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'left'}}>
        <label style={{ color: "#8d8d8d"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Choose the Exhibition category of your desire! {' '}  </label> 
        </div>
      <div  style={{display: 'flex', justifyContent: 'center', marginBottom : '1%',border : '1px', borderColor : 'Red'}} >

        
        <IdcardOutlined type="primary" style = {icons} onClick={() => categoryButtonHandler(1)}><IdcardOutlined style={{color: "#364d79" }} /> BUSINESS</IdcardOutlined>  
        <DesktopOutlined type="primary" style = {icons} onClick={() => categoryButtonHandler(2)}><DesktopOutlined style={{color: "#364d79" }} />IT</DesktopOutlined>    
        <CarOutlined type="primary" style = {icons} onClick={() => categoryButtonHandler(3)}><CarOutlined style={{color: "#364d79" }} />AUTOMOBILE</CarOutlined>    
        <PlaySquareOutlined type="primary" style = {icons} onClick={() => categoryButtonHandler(4)}><PlaySquareOutlined style={{color: "#364d79" }} />MEDIA</PlaySquareOutlined>     
        <EllipsisOutlined type="primary" style = {icons} onClick={() => categoryButtonHandler()}><EllipsisOutlined style={{color: "#364d79" }} />OTHERS</EllipsisOutlined>
        
        </div>
        <div  style={{display: 'flex', justifyContent: 'center', marginTop : '1%'}} >
>>>>>>> 0eb33c438e9d002cc13251bb6daab1e903901b12

        <Button type="primary" style = {buttonSt} onClick={() => categoryButtonHandler(1)}><IdcardOutlined style={{color: "#364d79" }} /> BUSINESS</Button>  
        <Button type="primary" style = {buttonSt} onClick={() => categoryButtonHandler(2)}><DesktopOutlined style={{color: "#364d79" }} />IT</Button>    
        <Button type="primary" style = {buttonSt} onClick={() => categoryButtonHandler(3)}><CarOutlined style={{color: "#364d79" }} />AUTOMOBILE</Button>    
        <Button type="primary" style = {buttonSt} onClick={() => categoryButtonHandler(4)}><PlaySquareOutlined style={{color: "#364d79" }} />MEDIA</Button> 
        <Button type="primary" style = {buttonSt} onClick={() => categoryButtonHandler(4)}><AndroidOutlined style={{color: "#364d79" }} />MOBILE</Button>    
        <Button type="primary" style = {buttonSt} onClick={() => categoryButtonHandler()}><EllipsisOutlined style={{color: "#364d79" }} />OTHERS</Button>

        </div>
      </div>  
 
    );    
}

export default LandingPage