import React, { useState } from 'react';
import {Card, CardBody, CardTitle,CardText,Button,Modal, CardImg} from 'reactstrap'

function BookCard({data,thumbnail}) {
  const info=data.volumeInfo
  const [openModal, setOpenModal] = useState(false);
  const toggle=()=>setOpenModal(!openModal)
  return <div className='mb-5' >
      <Card style={{width:'200px'}} className='m-auto'>
          <CardImg top style={{width:'100%',height:'200px'}} src={thumbnail}/>
          <CardBody>
              <CardTitle className='card-title' style={{overflowX:'hidden',fontWeight:'bold', color:'black' }}>
                {info.title}
              </CardTitle>
              <Button onClick={toggle} style={{backgroundColor:'black',color:'white'}}>Show more</Button>
          </CardBody>
          <Modal isOpen={openModal} toggle={toggle}>
              <div className='d-flex justify-content-around modal-header'>
                <div className='d-flex justify-content-center' style={{flex:'0.9'}}>
                  <h4 className='text-center modal-title'>{info.title}</h4>
                </div>
                 <button onClick={toggle} className='close' style={{flex:'0.1'}}>
                     <span aria-hidden={true}>X</span>
                 </button>
              </div>
              <div className='modal-body'>
                <div className='d-flex justify-content-between'>
                    <img src={thumbnail} alt={info.title} style={{width:'233px'}}></img>
                    <div>
                        <p>Page count:{info.pageCount}</p>
                        <p>Language:{info.language}</p>
                        <p>Authors:{info.authors}</p>
                        <p>Publishers:{info.publishers}</p>
                    </div>
                </div>
                <div className='mt-5'>
                  {info.description}
                </div>
              </div>
              <div className='modal-footer'>
                  <div className='left-silde'>
                    <a href={info.previewLink} className='btn-link' color='default' type='button' style={{color:'black'}}>Preview Link</a>
                  </div>
              </div>
          </Modal>
      </Card>
  </div>;
}

export default BookCard;
