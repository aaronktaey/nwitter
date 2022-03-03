import { authService, dbService } from "fbase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const Profile = ({refreshUser, userObj}) =>{
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const history = useHistory();
    const onLogOutClick = (event) => {
        authService.signOut();
        history.push("/");
    }
    const getMyNweets = async () => {
        const nweets = await dbService
        .collection("nweets")
        .where("creatorId","==", userObj.uid)
        .orderBy("createdAt")
        .get();
        console.log(nweets.docs.map(doc => doc.data()));
    }
    const onChange = (event) =>{
        const {
            target : {value}
        } = event;
        setNewDisplayName(value);
    }
    const onSubmit = async (event) =>{
        event.preventDefault();
        if(userObj.displayName !== {newDisplayName}){
           await userObj.updateProfile({
               displayName : newDisplayName,
            });
            refreshUser();
        }
    }
    useEffect(() =>{
        getMyNweets();
    },[]);
    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input 
                type="text" 
                placeholder="Display name" 
                onChange={onChange} 
                value={newDisplayName}
                autoFocus 
                className="formInput"/>
                <input 
                type="submit" 
                className="formBtn"
                style={{
                    marginTop:10,
                }}
                value={"Update " + userObj.displayName}/>
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    );
};
export default Profile; 