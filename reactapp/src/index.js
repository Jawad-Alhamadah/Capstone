import React from 'react'
import ReactDOM from 'react-dom'
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import MyApp from './components/CropPage/MyApp'

import { BrowserRouter } from 'react-router-dom'
ReactDOM.render(<BrowserRouter> <MyApp /> </BrowserRouter>,document.getElementById('root'))