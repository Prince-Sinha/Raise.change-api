import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Create from './Create'
import { useState,useEffect } from 'react';
import { NavLink ,json } from 'react-router-dom';

export default function Home(){
   const [unresolved,setUnresolved] = useState([]);
   const [support,setSupport] = useState([]);
   const id = localStorage.getItem('_id');

   useEffect(()=>{
      async function fetchPost(){

         try{
            const response = await fetch('/api/v1/posts/resolved');
            const resData = await response.json();

            setUnresolved(resData.data.post);

         }catch(err){
            toast.error('Something went wrong!', {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
               theme: "light"
               });
         }
      }
      
      fetchPost();

   },[]);

    return (

    <div id="bar-sider">
    <ToastContainer
         position="top-right"
         autoClose={5000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         rtl={false}
         pauseOnFocusLoss
         draggable
         pauseOnHover
         theme="light"
     />
      {
       
       unresolved.map((el,i) =>{
        return <div key={el._id} className="content">
               
               <div className="content-div">
                  <ul>
                    <li>
                        <h2>{el.title}</h2>
                    </li>
                    <li><p className='limited-paragraph'>{el.problemStatement}</p></li>
                    <div className='spt-det-btn'>
                    <Alert sx={{border: 0}} variant="outlined" severity="success">Supported</Alert>
                    <li><NavLink to={`posts/${el._id}`} end><button>Detail</button></NavLink></li>
                    </div>
                  </ul>
                <div className='content-div-info'>
                   <ul>
                      
                      <li><PeopleAltOutlinedIcon color="success" /><span> <strong>{el.user.name}</strong></span></li>
                      <li><DriveFileRenameOutlineOutlinedIcon color="primary" /><span>{`${el.createdAt}`}</span></li>
                   </ul>
                   <ul>
                      <li><a href=""><QuestionAnswerOutlinedIcon color="primary"/></a><span>{el.opinions.length}</span></li>
                      <li><a><PollOutlinedIcon color="success" /></a><span>{el.UpVote}</span></li>
                   </ul>
                </div>
               </div>
               
               {el.photo ?
               <div className='content-div-img'>
                   <img src={`postimg/${el.photo}`} alt="" /></div>: <div></div> }
              
               
        </div>
        })
      }
        <Create />
        </div>);
}