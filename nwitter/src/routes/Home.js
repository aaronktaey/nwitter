import { dbService } from "fbase";
import React, { useEffect, useState } from "react";
import Nweet from "./Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({userObj}) => {
    const [nweets, setNweets] = useState([]);
    useEffect(() => {
        const getData = dbService.collection("nweets").orderBy("createdAt","desc").onSnapshot((snapshot) => {
          const nweetArray =snapshot.docs.map((doc) => ({
              id:doc.id, 
              ...doc.data(),
        })); 
        setNweets(nweetArray);
        });
        return () => getData();
    }, []);
    
    return(
        <div className="container">
            <NweetFactory userObj={userObj}/>
            <div style={{ marginTop: 30 }}>{nweets.map(nweet => (
                <Nweet key={nweet.id} nweetObj={nweet} isOwner={nweet.creatorId === userObj.uid ? true : false}/>
                ))}
            </div>
        </div>
    );
}; 
export default Home; 