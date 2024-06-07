import Home from '../src/components/home';
import Posts from '../src/components/posts';
import NotFound from '../src/components/notFound';
import About from '../src/components/about';
import Contact from '../src/components/contact';
import Services from '../src/components/services';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
   BrowserRouter,
   Routes,
   Route,
} from "react-router-dom";

ReactDOM.render(
   <React.StrictMode>
       <BrowserRouter>
           <Routes>
               <Route path="/" element={<App/>}>
                   <Route path="home" element={<Home/>}/>
                   <Route path="posts" element={<Posts/>}/>
                   <Route path="about" element={<About/>}/>
                   <Route path="contact" element={<Contact/>}/>
                   <Route path="services" element={<Services/>}/>
                   <Route
                       path="*"
                       element={
                           <NotFound/>
                       }
                   />
               </Route>
           </Routes>
       </BrowserRouter>
   </React.StrictMode>,
   document.getElementById('root')
);