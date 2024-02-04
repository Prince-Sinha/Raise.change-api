import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import PollOutlinedIcon from '@mui/icons-material/PollOutlined';
import {useState , useEffect} from 'react';
import { useRouteLoaderData} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Create from './Create'
import DefaultContent from '../components/DefaultContent';
export default function Post(){
   const [post , setPost] = useState([]);

   const id = localStorage.getItem('_id');

   useEffect(()=>{
     async function fetchPost(){
        try{
            const response = await fetch(`http://127.0.0.1:8000/api/v1/users/posts/${id}`);
            const resData = await response.json();
            if(response.ok){
              setPost(resData.data.post);
            }
        }
        catch(err){
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
    if(post.length === 0){
      return <DefaultContent>You have not posted anything yet!</DefaultContent>
    }

    return (<div id="bar-sider">
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
       
       post.map((el,i) =>{
        return <div key={el._id} className="content">
               
               <div className="content-div">
                  <ul>
                    <li>
                        <h2>{el.title}</h2>
                    </li>
                    <li><p className='limited-paragraph'>{el.problemStatement}</p></li>
                  </ul>
                <div className='content-div-info'>
                   <ul>
                     <li><DriveFileRenameOutlineOutlinedIcon color="primary" />{`${el.createdAt}`}</li>
                   </ul>
                   <ul>
                      <li><a><PollOutlinedIcon color="success" /></a>{el.UpVote}</li>
                   </ul>
                </div>
               </div>
               {el.photo ? 
               <div className='content-div-img'>
                   <img src={`http://localhost:8000/posts/${el.photo}`} alt="" />
                </div> : <div></div> 
                } 
              
               
        </div>
        })
      }
        <Create />
        </div>);
}