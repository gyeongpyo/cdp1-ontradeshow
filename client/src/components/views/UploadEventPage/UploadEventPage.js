import React, { useEffect, useState } from "react";
import {Typography, Button, Form, message, Input, Icon } from 'antd';
import FileUpload from '../../utils/FileUpload';
import Calendar from 'react-calendar';
import Axios from 'axios';

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

const STime = [
	{key: 1, value: "   00:00 ~          "},
	{key: 2, value: "   01:00 ~          "},
	{key: 3, value: "   02:00 ~          "},
  {key: 4, value: "   03:00 ~          "},
  {key: 5, value: "   04:00 ~          "},
  {key: 6, value: "   05:00 ~          "},
  {key: 7, value: "   06:00 ~          "},
  {key: 8, value: "   07:00 ~          "},
	{key: 9, value: "   08:00 ~          "},
	{key: 10, value: "   09:00 ~          "},
  {key: 11, value: "   10:00 ~          "},
  {key: 12, value: "   11:00 ~          "},
  {key: 13, value: "   12:00 ~          "},
	{key: 14, value: "   13:00 ~          "},
	{key: 15, value: "   14:00 ~          "},
	{key: 16, value: "   15:00 ~          "},
  {key: 17, value: "   16:00 ~          "},
  {key: 18, value: "   17:00 ~          "},
  {key: 19, value: "   18:00 ~          "},
  {key: 20, value: "   19:00 ~          "},
  {key: 21, value: "   20:00 ~          "},
	{key: 22, value: "   21:00 ~          "},
	{key: 23, value: "   22:00 ~          "},
  {key: 24, value: "   23:00 ~          "}
]

const FTime = [
	{key: 1, value: "   00:00 "},
	{key: 2, value: "   01:00 "},
	{key: 3, value: "   02:00 "},
  {key: 4, value: "   03:00 "},
  {key: 5, value: "   04:00 "},
  {key: 6, value: "   05:00 "},
  {key: 7, value: "   06:00 "},
  {key: 8, value: "   07:00 "},
	{key: 9, value: "   08:00 "},
	{key: 10, value: "   09:00 "},
  {key: 11, value: "   10:00 "},
  {key: 12, value: "   11:00 "},
  {key: 13, value: "   12:00 "},
	{key: 14, value: "   13:00 "},
	{key: 15, value: "   14:00 "},
	{key: 16, value: "   15:00 "},
  {key: 17, value: "   16:00 "},
  {key: 18, value: "   17:00 "},
  {key: 19, value: "   18:00 "},
  {key: 20, value: "   19:00 "},
  {key: 21, value: "   20:00 "},
	{key: 22, value: "   21:00 "},
	{key: 23, value: "   22:00 "},
  {key: 24, value: "   23:00 "}
]

const Exhibitions = [
	{key: 1, value: "Business"},
	{key: 2, value: "IT development"},
	{key: 3, value: "Automobile" },
	{key: 4, value: "Media"}
]


function UploadEventPage(props) {

  const [Images, setImages]=useState([])                                //전시회 이미지

  const [date, setDate]=useState(new Date())                            //전시회 일정
  const [STimeValue, setSTimeSelectChange] = useState(1)  
  const [FTimeValue, setFTimeSelectChange] = useState(1)
  
  const [TitleValue, setTitleValue] = useState("")                      //전시회 제목
  const [ExhibitionValue, setExhibitionSelectChange] = useState(1)      //전시회 카타고리

  const [SDescriptionValue, setSDescriptionValue] = useState("")        //전시회 한줄 요약

  const [PriceValue, setPriceValue] = useState(0)                       //전시회표 가격
  const [QuantityValue, setQuantitySelectChange] = useState(1)          //전시회표 수량

  const [FDescriptionValue, setFDescriptionValue] = useState("")        //전시회 내용
  
  const [value, setState] = useState(null);                             //온오프여부, 주소
  const [AddressValue, setAddressValue] = useState("")     

  const onChange=(date)=>{
     setDate(date)
  }

  const onSTimeSelectChange = (event) => {
     setSTimeSelectChange(event.currentTarget.value);
  }
  
  const onFTimeSelectChange = (event) => {
      setFTimeSelectChange(event.currentTarget.value);
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
    <div style ={{ maxWidth: '700px', margin: '2rem auto'}}>
      <div style={{textAlign:'center',marginBottom:'2rem'}}>
        <Title level={2}> Exhibition Register </Title>
      </div>
  
      <Form onSubmit={submitHandler}>
         {/*DropZone*/}

      
        {/*}div style={{textAlign:'center'}}>
         <label>Image Upload  (.jpeg .png)</label>  
  </div>*/}
      <br/>
      <br/>
    
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
    
    <div style={{textAlign:'center',marginBottom:'2rem'}} handleChange={setState.bind(this)}>
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
    

    <div style={{textAlign:'center'}}>
        <Calendar onChange={onChange} value={date}/>
        <br/>
        <label style={{ fontWeight: 'bold' }}>Exhibition Start Time : {' '}  </label>
          <select onChange={setSTimeSelectChange}>

            {STime.map(item =>(
              <option key={item.key} value={item.value}>{item.value}</option>
            ))}  

          </select>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <label style={{ fontWeight: 'bold' }}>Exhibition End Time : {' '}  </label>
        
        <select onChange={setFTimeSelectChange}>
         {FTime.map(item =>(
          <option key={item.key} value={item.value}>{item.value}</option>
          ))}  

        </select>

      </div>

    <Button type="submit" onClick={submitHandler}> 
      Submit
    </Button>
    
    </Form>
  
    </div>
  )
}

export default UploadEventPage
