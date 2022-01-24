import './App.css';
import { Input, InputGroup, Button, InputGroupText, FormGroup, Label } from 'reactstrap';

function App() {
  return (
    <div className="App">
      <div className='image_cover d-flex flex-column justify-content-center align-items-center'>
         <div className='filter'></div>
         <h1 className='text-white display-2 text-center mb-3 ' style={{'zIndex':'2'}}>Book Dhundho</h1>
         <div className='d-flex flex-column justify-content-center align-items-center' style={{width:'50%', zIndex:2}}>
            <InputGroup size = 'lg' className='mb-4'>
              <Input placeholder='Enter your keyword..'/>
              <InputGroupText  style={{backgroundColor:"white"}}>
                <Button style={{backgroundColor:"white", color:'black', border:'none'}}>
                  <i className='fas fa-search'></i>
                </Button>
              </InputGroupText>
            </InputGroup>
         </div>
         <div className='d-flex justify-content-center text-white' style={{'zIndex':'2'}}>
            <FormGroup>
              <Label for='maxResults'>Max results</Label>
              <Input type="number" id='maxResults' placeholder='Max results'></Input>
            </FormGroup>
         </div>
      </div>
    </div>
  );
}

export default App;
