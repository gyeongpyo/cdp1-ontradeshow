import React, { useEffect, useState } from "react";
import {Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Calendar from 'react-calendar';
import Axios from 'axios';
import { ArrowRightOutlined } from '@ant-design/icons';
import './design/UploadEventPage.css'
import { Container } from "@material-ui/core";
import autoin_name from './design/autoin_name.png';
import instruction from './design/instruction.png';
import { DatePicker } from 'antd';


const{Title} = Typography;
const{TextArea} = Input;

const Quantities = [
	{key: 1, value: "10 ~ 30"},
	{key: 2, value: "30 ~ 50"},
	{key: 3, value: "50 ~ 100"},
  {key: 4, value: "100 ~ 150"},
  {key: 5, value: "150 ~ 200"},
  {key: 6, value: "200 ~ 300"},
  {key: 7, value: "300 +"}
]

const Exhibitions = [
	{key: 1, value: "Business"},
	{key: 2, value: "IT development"},
	{key: 3, value: "Automobile" },
	{key: 4, value: "Media"}
]

const { RangePicker } = DatePicker;
function UploadEventPage(props) {
  

  const [Images, setImages]=useState([])                                //전시회 이미지

  const [date, setDate]=useState(new Date())                            //전시회 일정
  const [StartTime, setStartTime] = useState(null)
  const [EndTime, setEndTime] = useState(null)
  
  const [TitleValue, setTitleValue] = useState("")                      //전시회 제목
  const [ExhibitionValue, setExhibitionSelectChange] = useState(1)      //전시회 카타고리

  const [SDescriptionValue, setSDescriptionValue] = useState("")        //전시회 한줄 요약

  const [PriceValue, setPriceValue] = useState(0)                       //전시회표 가격
  const [QuantityValue, setQuantitySelectChange] = useState(1)          //전시회표 수량

  const [FDescriptionValue, setFDescriptionValue] = useState("")        //전시회 내용
  
  const [value, setState] = useState(null);                             //온오프여부, 주소
  const [AddressValue, setAddressValue] = useState("")     


  const handleStartTime = (time, timeString) => {
    console.log(time, timeString);
    setStartTime(time);
  }

  const handleEndTime = (time, timeString) => {
    console.log(time, timeString);
    setEndTime(time);
  }

  const onChange=(date)=>{
     setDate(date)
  }

  const onTitleChange=(event)=>{
     setTitleValue(event.currentTarget.value)
  }

	const onExhibitionSelectChange = (event) => {
		  setExhibitionSelectChange(event.currentTarget.value);
	}

  const onSDescriptionChange=(event)=>{
      setSDescriptionValue(event.currentTarget.value)
  }

  const onPriceChange=(event)=>{
      setPriceValue(event.currentTarget.value)
  }

  const onQuantitySelectChange = (event) => {
      setQuantitySelectChange(event.currentTarget.value);
  }

  const onFDescriptionChange=(event)=>{
      setFDescriptionValue(event.currentTarget.value)
  }

  const handleChange = (event) => {
      setState(event.target.value);
  }

  const onAddressChange = (event)=>{
      setAddressValue(event.currentTarget.value)
  }

  const updateImages=(newImages)=>{
    setImages(newImages)
  }

  const submitHandler = (event) => {
    event.preventDefault();

	// online, offline radio button 값이 안 넘어 와서 일단 제외
    if (!Images || !TitleValue || !SDescriptionValue || !PriceValue ||
       !FDescriptionValue || !AddressValue || !QuantityValue || !ExhibitionValue) {
		//console.log( Images, TitleValue, SDescriptionValue, PriceValue, FDescriptionValue, AddressValue, QuantityValue, value, ExhibitionValue);
         return alert("Fill in all blanks!")
    }
	
	const body = {
		writer: props.user.userData._id,
		title: TitleValue,
		category: ExhibitionValue,
		simple_description: SDescriptionValue,
		price: PriceValue,
		num_of_participants: QuantityValue,
		full_description: FDescriptionValue,
		images: Images,
		is_online: value,
		address: AddressValue
  };
  
  console.log(body);

	Axios.post("/api/product", body)
		.then(response => {
			if (response.data.success) {
				alert('Success to upload the event');
				props.history.push('/');
			} else {
        alert('Fail to upload the event')
        console.log(response);
			}
		});
  }

  return (
    <div>
      <div class='base'>
      <div className='container'>
        <p class='unclrlayer'>
         <br/>
         <span class='text1'> EXHIBITION
         <br/>
         </span><span class='text2'> REGISTER</span>
         <br/>
         <br/>
         <img class ='autoinname'
          src={autoin_name}
          style={{width: '75px', height: '25px'}}/>
        </p>
          
          
      </div>
        <div style= {{textAlign: 'center'}}>
        <div class='Title'>
            AUTOIN
            <span class='Title2'>APPLICATION PROCESS</span>
          </div>

          <img class ='instruction'
          src={instruction}
          style={{align: 'center', width: '100%', height: '10%'}}/>
        </div>


      <div class='boxed1'>
        <div style ={{ maxWidth: '800px', margin: '0 25px 2rem 25px'}}>
          <div style={{textAlign:'center',marginBottom:'2rem'}}>

        <div class= 'step1'> STEP1. Basic Information </div>
        <hr class="step1border"/>
      </div>
 
      <Form onSubmit={submitHandler}>
         {/*DropZone*/}

      
        {/*}div style={{textAlign:'center'}}>
         <label>Image Upload  (.jpeg .png)</label>  
  </div>*/}
    
      <label style={{ fontWeight: 'bold' }}>Exhibition Name  </label>
        <Input
          onChange={onTitleChange}
          value={TitleValue}
        />
      <br/>
      <br/>
    
      <div>
        <label style={{ fontWeight: 'bold' }}>Category :&nbsp; </label>
        
        <select onChange={onExhibitionSelectChange} value={ExhibitionValue}>
          {Exhibitions.map(item =>(
           <option key={item.key} value={item.key}>{item.value}</option>
          ))}  
        </select>
      </div>
     
      <br/>
      <br/>
    
      <label style={{ fontWeight: 'bold' }}>Simple Description  </label>
        <TextArea
          onChange={onSDescriptionChange}
          value={SDescriptionValue}
        />
      
      <br/>
      <br/>

      <div class= 'step2'> STEP2. Details (Time & location) </div>
        <hr class="step2border"/>      

      <label style={{ fontWeight: 'bold' }}>Price per Ticket (won)   </label>
        <Input
          onChange={onPriceChange}
          value={PriceValue}
          type="number"
        />
      
      <br/>
      <br/>
    
      <label style={{ fontWeight: 'bold' }}>Total Number of Expected Participants : {" "}
        <select onChange={onQuantitySelectChange} value={QuantityValue}>
          {Quantities.map(item =>(
           <option key={item.key} value={item.key}>{item.value}</option>
          ))}  
        </select>
      </label>

     <br/>
     <br/>
    
     <label style={{ fontWeight: 'bold' }}>Full Description  </label>
       <TextArea
          onChange={onFDescriptionChange}
          value={FDescriptionValue}
      />

    <br/>
    <br/>
    
    <div style={{textAlign:'left',marginBottom:'2rem'}} handleChange={setState.bind(this)}>
      <label style={{ fontWeight: 'bold' }}>Location (If the exhibition is held offline, please type the address below) </label>
      
      <br/>
      <br/>
      
      <input type="radio" value="ONLINE" name="is_online" defaultChecked={value ==="ONLINE"} /> ONLINE
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 
      <input type="radio" value="OFFLINE" name="is_online" defaultChecked={value ==="OFFLINE"}/> OFFLINE
    
      <br/>
      <br/>
      
      <label style={{ fontWeight: 'bold' }}> Address (Offline Exhibition ONLY)
             <Input
         onChange={onAddressChange}
          value={AddressValue}
       />
      </label>
    </div>
    
    <label style={{ fontWeight: 'bold' }}> Upload a poster:
      <FileUpload refreshFunction={updateImages}/>
    </label>
    
   
          
    <div style={{textAlign:'left'}}>
        <br/>
        <label style={{ fontWeight: 'bold' }}>Exhibition Start Time - Exhibition End Time {' '}  </label>
  
        <div>
          <RangePicker showTime />
        </div>
      </div>
      <br/>
      <br/>
      <div style={{color: 'red', display: 'flex', justifyContent: 'center'}}>
      I have filled in all the exhibition information
      </div>
      <br/>
      <div style={{display: 'flex', justifyContent: 'center'}}>

        <Button style={{marginTop:'-5px'}}type="submit" onClick={submitHandler}> 
              Submit
        </Button>
      </div>  
    </Form>
  
    </div>
    </div>
    </div>
    </div>
  )
}
export default UploadEventPage
