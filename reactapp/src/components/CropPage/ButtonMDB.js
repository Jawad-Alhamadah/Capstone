import {React,Component} from 'react' 
import {Button} from 'react-bootstrap'
import { MDBRipple } from 'mdb-react-ui-kit';

function ButtonMDB (props) {
   
        return (
            <MDBRipple
            className='bg-image hover-overlay btn-warning ripple' 
            style={{ maxWidth: '15rem' }}
            rippleTag='div'
            rippleColor='gray-900'
          >
            <Button onClick={props.function} className='col-12 ' variant ="warning">{props.text}</Button>
            <a href='#UploadImage' >
              <div className='mask' style={{ backgroundColor: 'rgba(255, 214, 74, 0.18)' }}></div>
            </a>
          </MDBRipple>
          )
}

export default ButtonMDB