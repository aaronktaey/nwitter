import { useEffect, useState } from "react";
import AppRouter from "components/Router";
import {authService} from "fbase";

function App() {
  const [init, setInit] = useState(false);  // 함수형 컴포넌트에서도 상태 관리를 할 수 있는 React Hook - useState
  const [isLoggedIn, setIsLoggedin] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() =>{  // 렌더링 직후 실행되는 React Hook - useEffect 
    authService.onAuthStateChanged((user) => {
      if(user){
        setIsLoggedin(true);
        setUserObj({
          displayName : user.displayName,
          uid : user.uid,
          updateProfile :  (args) => user.updateProfile(args),
        });
      }else{
        setIsLoggedin(false);
      }
      setInit(true);
     });
  },[]);
  const refreshUser = () => {
    const user = authService.currentUser;
    setUserObj({
      displayName : user.displayName,
      uid : user.uid,
      updateProfile :  (args) => user.updateProfile(args),
    });
  };
  return (
<>
    {init ? (<AppRouter refreshUser={refreshUser} isLoggedIn={isLoggedIn} userObj={userObj}/>) : "Initializing..."}
    { <footer>&copy; Nwitter {new Date().getFullYear()}.{new Date().getMonth()}.{new Date().getDate()}</footer> }
  </>
  );
}

export default App;
