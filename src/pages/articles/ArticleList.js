import React, { useContext, useEffect } from "react"
import { UserContext } from "../../context/UserContext";
import { getAllArticles } from "../../services/userService";
import Article from "./Article";
import { GET_ALL_ARTICLES } from "../../context/UserContext";
import {JitsiMeeting,JaaSMeeting} from "@jitsi/react-sdk"
import { Navigate, useNavigate } from "react-router-dom";


const ArticleList = () => {
  const navigate = useNavigate()
  const {user:{articles},userDispatch} = useContext(UserContext);
  useEffect(()=>{
    getAllArticles().then(res=>{
      console.log(res.data)
        userDispatch({
          type:GET_ALL_ARTICLES,
          payload:res.data
        })
        

        // const hangup = document.querySelector(".hangup-button")
        // hangup.addEventListener("click",function(){
        // navigate("/login")
        // })
    }).catch(err=>{
      console.log(err)
    })
    },[])
  return (
    <>
    {/* <JitsiMeeting
  onReadyToClose={()=>window.location.reload()}  
    // domain = { "http://localhost:3000/external_api.js" }
    roomName = "PleaseUseAGoodRoomName"
    configOverwrite = {{
        startWithAudioMuted: true,
        disableModeratorIndicator: true,  
        startScreenSharing: true,
        enableEmailInStats: false,
    }}
    interfaceConfigOverwrite = {{
        DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
        SHOW_POWERED_BY: false,
        SHOW_PROMOTIONAL_CLOSE_PAGE: false
    }}
    userInfo = {{
        displayName: 'YOUR_USERNAME'
    }}
    onApiReady = { (externalApi) => {
        // here you can attach custom event listeners to the Jitsi Meet External API
        // you can also store it locally to execute commands
        console.log('Jitsi Meet External API', externalApi)
    } }
    getIFrameRef = { (iframeRef) => { iframeRef.style.height = '400px'; } }
/> */}

{/* <JaaSMeeting
 getIFrameRef = { (iframeRef) => { iframeRef.style.height = '400px'; } }
     roomName= 'TestingJaaSMeetingComponent'
     appId='exampleAppId'
    //  spinner={CustomSpinner}
     onApiReady={(externalApi) => console.log(externalApi)}
   /> */}
      <h1>Articles List</h1>
      <div className="articles">
        {articles.map((article,idx) => (
          <Article
            key={idx}
            article={article}
          />
        ))}
      </div>
    </>
  );
};

export default ArticleList;
