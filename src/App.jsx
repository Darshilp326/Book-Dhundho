/* eslint-disable react-hooks/exhaustive-deps */
import './App.css';
import { Input, InputGroup, Button, InputGroupText, FormGroup, Label, Spinner, Card } from 'reactstrap';
import { useEffect, useState } from 'react';
import {toast, ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import BookCard from './BookCard';


function App() {
  const [keyword, setKeyword] = useState('');
  const [maxm, setMaxm] = useState(5);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startIndex,setStartIndex]=useState(1)
  const [page,setPage]=useState(1);  


  useEffect(() => {
    if(keyword){
      const data=async()=>{
        const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=${maxm}&startIndex=${startIndex}`)
        console.log(res)
        if(res.data?.items?.length>0)setResults(res.data.items)
        else {
          setResults([])
          toast.error('No books found!!')
        }
         setLoading(false)
      }
      setLoading(true)
      if(maxm>40){
        toast.error('Maximum limit is 40')
      }
      else{
       try{
         data()
        }
        catch(e){
           setLoading(false)
           toast.error(`${e.response.data.error.message}`)
        }
      }    
    }
    
  }, [startIndex]);
  

  const handleSubmit=async()=>{
     console.log({keyword,maxm})
     setLoading(true)
     if(maxm>40){
       toast.error('Maximum limit is 40')
     }
     else{
      try{
        const res = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=${maxm}&startIndex=${startIndex}`)
        // console.log(res.data);
        if(res.data?.items?.length>0){
          setResults(res.data.items)
          setStartIndex(1)
          setPage(1)
        }
        else toast.error('No books found!')
        setLoading(false)
       }
       catch(e){
          setLoading(false)
          toast.error(`${e.response.data.error.message}`)
       }
     }
  }
  const handleNext=()=>{
    let curr=page+1
    setPage(curr)
    setStartIndex((maxm*page)+1)
  }
  const handlePrev=()=>{
    let curr=page
    setPage(curr-1)
    setStartIndex((page-1)*maxm)
  }
  const items=results.map((res,i)=>{
      let img=''
      if(res.volumeInfo.imageLinks.thumbnail){
        img=res.volumeInfo.imageLinks.thumbnail
      }
      return(
        <div className='col-lg-4' key={i}>
          <BookCard thumbnail={img} data={res}/>
        </div>
      )
  })
  return (
    <div className="App">
      <div className='image_cover d-flex flex-column justify-content-center align-items-center'>
         <div className='filter'></div>
         <h1 className='text-white display-2 text-center mb-3 ' style={{'zIndex':'2'}}>Book Dhundho</h1>
         <div className='d-flex flex-column justify-content-center align-items-center' style={{width:'50%', zIndex:2}}>
            <InputGroup size = 'lg' className='mb-4'>
              <Input placeholder='Enter your keyword..' value={keyword} onChange={e=>setKeyword(e.target.value)}/>
              <InputGroupText  style={{backgroundColor:"white"}}>
                <Button onClick={handleSubmit} style={{backgroundColor:"white", color:'black', border:'none'}}>
                  <i className='fas fa-search'></i>
                </Button>
              </InputGroupText>
            </InputGroup>
         </div>
         <div className='d-flex justify-content-center text-white' style={{'zIndex':'2'}}>
            <FormGroup>
              <Label for='maxResults'>Max results</Label>
              <Input type="number" id='maxResults' placeholder='Max results' value={maxm} onChange={e=>setMaxm(e.target.value)}></Input>
            </FormGroup>
         </div>
      </div>
      <div className='d-flex justify-content-center mt-5'>
        {loading ? 
        <Spinner style={{width:'5rem', height:'5rem'}}></Spinner>:
          <div className='container my-5'>
            <div className='row'>{items}</div>
          </div>
        }
      </div>
      
      <ToastContainer/>
    </div>
  );
}

export default App;
