  import React, { useEffect, useState }from 'react'
  import { FaCode, FaSortAmountDown } from "react-icons/fa";
  import axios from 'axios';

  import ImageSlider from '../../utils/ImageSlider';
  import { Carousel, Icon,Col,Row,Card } from 'antd';
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
  const {Meta} = Card;



  function LandingPage(props) {
      const history = useHistory();
      const [Events, setEvents] = useState([]);
      const [PostSize, setPostSize] = useState();
      const [Skip, setSkip] = useState(0);
      const [Limit, setLimit] = useState(6);
      const [Filters, setFilters] = useState({
        category: [],
        price: []
      });
     // const [Events, setEvents] = useState([]);

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

  useEffect(() => {
		let body = {
			skip: Skip,
			limit: Limit
		}
		getEvents(body);
        
  }, []);
  

  const getEvents = (body) => {
		axios.post('/api/product/products', body)
            .then(response => {
				console.log(response.data.success)
                if (response.data.success) {
					if (body.loadMore) {
						setEvents([...Events, ...response.data.info]);
					} else {
						setEvents(response.data.info);
					}
					setPostSize(response.data.postSize);
                } else {
                    alert('fail to load events');
                }
            })
  }
  

      const buttonSt = {
          border: "white", //1px solid #364d79
          color: "#364d79",
          background: "white",
          width : '150px',
          margin:'45px',
      };


      const categoryButtonHandler = (category) => {

        history.push({
          pathname: '/event/search',
          //search: `?query=${category}`
          state: {category: category}
        });
      }

      const renderCards = Events.map((event, index) => {
        //console.log('Event', event);
        return<Col lg = {1} key={index} style = {{width : '220px',padding : '15px',background : ' #364d79'}}>
            <Card
              cover={<a href={`/event/${event._id}`}>
                <img style={{position : 'inline', width: '100%', height: '100px', maxHeight: '30%'}} src={`http://localhost:5000/${event.images[0]}`}/>
                </a>} 
              >
              <Meta 
                title={event.title}
                description={`$${event.price}`}
              />
            </Card>
          </Col>
      })

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
          <h1> &nbsp;&nbsp;&nbsp;&nbsp;가장 인기있는 카테고리</h1>
          </div>
          <div style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'left'}}>
          <label style={{ color: "#8d8d8d"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;관심지수가 가장 높은 인기 카테고리는 여기서 찾아보세요! {' '}  </label> 
          </div>
          <div  style={{display: 'flex', justifyContent: 'center', marginTop: "2%"}} >

          <IdcardOutlined type="primary" style = {IdcardOutlinedst} onClick={() => categoryButtonHandler(1)}><IdcardOutlined style={{color: "#123d79" }} /> BUSINESS</IdcardOutlined>  
          <DesktopOutlined type="primary" style = {DesktopOutlinedst} onClick={() => categoryButtonHandler(2)}><DesktopOutlined style={{color: "#123d79" }} />IT</DesktopOutlined>    
          <CarOutlined type="primary" style = {CarOutlinedst} onClick={() => categoryButtonHandler(3)}><CarOutlined style={{color: "eb2f96" }} />AUTOMOBILE</CarOutlined>    
          <PlaySquareOutlined type="primary" style = {PlaySquareOutlinedst} onClick={() => categoryButtonHandler(4)}><PlaySquareOutlined style={{color: "#364d79" }} />MEDIA</PlaySquareOutlined> 
          <AndroidOutlined type="primary" style = {AndroidOutlinedst} onClick={() => categoryButtonHandler(4)}><AndroidOutlined style={{color: "#364d79" }} />MOBILE</AndroidOutlined>    
          <EllipsisOutlined type="primary" style = {EllipsisOutlinedst} onClick={() => categoryButtonHandler()}><EllipsisOutlined style={{color: "#364d79" }} />OTHERS</EllipsisOutlined>

          </div>
          <div  style={{display: 'flex', justifyContent: 'center',marginTop: "-4%"}} >

          <Button type="primary" style = {buttonSt} onClick={() => categoryButtonHandler(1)}><IdcardOutlined style={{color: "#364d79" }} /> BUSINESS</Button>  
          <Button type="primary" style = {buttonSt} onClick={() => categoryButtonHandler(2)}><DesktopOutlined style={{color: "#364d79" }} />IT</Button>    
          <Button type="primary" style = {buttonSt} onClick={() => categoryButtonHandler(3)}><CarOutlined style={{color: "#364d79" }} />AUTOMOBILE</Button>    
          <Button type="primary" style = {buttonSt} onClick={() => categoryButtonHandler(4)}><PlaySquareOutlined style={{color: "#364d79" }} />MEDIA</Button> 
          <Button type="primary" style = {buttonSt} onClick={() => categoryButtonHandler(4)}><AndroidOutlined style={{color: "#364d79" }} />MOBILE</Button>    
          <Button type="primary" style = {buttonSt} onClick={() => categoryButtonHandler()}><EllipsisOutlined style={{color: "#364d79" }} />OTHERS</Button>

          </div>
          <div style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'left', marginTop: "2%"}}>
          <h1> &nbsp;&nbsp;&nbsp;&nbsp;최근 전시회</h1>
          </div>
          <div style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'left'}}>
          <label style={{ color: "#8d8d8d"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;전시회가 가장 최근에 개설! {' '}  </label> 
          </div>
          
          <div style ={{display: 'flex', justifyContent: 'center',marginTop: "2%", textAlign : 'center'}}>
              {/* Card */}
              <Row>
                  {renderCards}
              </Row>
      </div>

      <div style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'left', marginTop: "2%"}}>
          <h1> &nbsp;&nbsp;&nbsp;&nbsp;전시회 광고판</h1>
          </div>
          <div style={{ fontWeight: 'bold', display: 'flex', justifyContent: 'left'}}>
          <label style={{ color: "#8d8d8d"}}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;전시회 광고를 보실수 있습니다 {' '}  </label> 
          </div>
      <Carousel autoplay>

<div>
<h3>{ <img style={{width: '80%', height: '50%',margin: "Auto",marginTop: "2%"}} src={banner_1}/> }</h3>
</div>

<div>
<h3> { <img style={{width: '80%', height: '50%',margin: "Auto",marginTop: "2%"}} src={banner_2}/> }</h3>
</div>

<div>
<h3> { <img style={{width: '80%', height: '50%',margin: "Auto",marginTop: "2%"}} src={banner_3}/> }</h3>
</div>

<div>
<h3> { <img style={{width: '80%', height: '50%',margin: "Auto",marginTop: "2%"}} src={banner_4}/> }</h3>
</div>

</Carousel>
        </div>  
        
  
      );    
  }

  export default LandingPage