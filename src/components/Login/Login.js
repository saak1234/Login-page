    import React,{useState,useEffect} from 'react';
    import Card from '../UI/Card';
    import Button from '../UI/Button';
    import './Login.css';

    const Login =(props)=>{
    
    
    const [signuserName,setsignUserName]=useState("");
    const [signpassword,setsignPassword]=useState("");
    const [signconfirmPassword,setsignConfirmPassword]=useState("");
    const [signEmail,setsignEmail]=useState("");
    const[signIn,setsignIn]=useState(false);
    const signInHandler=(e)=>{
        e.preventDefault();
    setsignIn(true);
    }
    const signchangeEmailHandler=(e)=>{
        setsignEmail(e.target.value);
    }
    const signchangeUserHandler=(e)=>{
        setsignUserName(e.target.value);
    }
    const signchangePasswordHandler=(e)=>{
        setsignPassword(e.target.value);
    }
    const signchangeConfirmPasswordHandler=(e)=>{   
        setsignConfirmPassword(e.target.value);
    }
        const [userName,setUserName]=useState("");
        const [password,setPassword]=useState("");
        const [confirmPassword,setConfirmPassword]=useState("");
        const changeUserHandler=(e)=>{
            setUserName(e.target.value);
        }
        const changePasswordHandler=(e)=>{
            setPassword(e.target.value);
        }
        const changeConfirmPasswordHandler=(e)=>{
            setConfirmPassword(e.target.value);
        }

        const[valid,setValid]=useState(false);
        useEffect(()=>{
            (userName.length>4 && password.length>=6 && confirmPassword.length>=6 && password===confirmPassword)?setValid(true):setValid(false)
        },[userName,password,confirmPassword]);
        const[isvalid,setisValid]=useState(false);
        useEffect(()=>{
            (signuserName.length>4 && signpassword.length>=6 && signconfirmPassword.length>=6 && signpassword===signconfirmPassword && signEmail.includes('@'))?setisValid(true):setisValid(false)
        },[signuserName,signpassword,signconfirmPassword,signEmail]);
        const [dataArray,setdataArray]=useState([]);
   
        
        const signUpHandler=async(e)=>{
            e.preventDefault();
            const res= await fetch("https://login-page-7597e-default-rtdb.firebaseio.com/logininfo.json",
            {
            method:"POST",
            headers:{ 
                "Content-Type":"application/json",
        
            },
            body:JSON.stringify({
                signuserName,
                signpassword,
                signEmail,
            }),
            }
            
            )   
            setsignIn(false);
        setsignConfirmPassword("");
        setsignEmail("");
        setsignPassword("");
        setsignUserName("");
        
        }
        const [usname,setusname]=useState("");
        useEffect(() => {
            const fetchData = async () => {
            const ref = await fetch("https://login-page-7597e-default-rtdb.firebaseio.com/logininfo.json");
            const data = await ref.json();
            if (data) {
                const dataArray = Object.values(data);
                setdataArray(dataArray);
            }
            };
            fetchData();
        }, [signUpHandler]);
        const[validLoggedIn,setValidLoggedIn]=useState(false);
        const loginVerification = (e) => {
          console.log("verifying");
          e.preventDefault();
        
            if (dataArray != null) {
              dataArray.some(data => {
                if (userName === data.signuserName && password === data.signpassword) {
                    console.log("yes");
                  setValidLoggedIn(true);
                  props.setLoggedIn(true)
                  return true;
                } else {
                    console.log("no");
                  setValidLoggedIn(false);
                  props.setLoggedIn(false)
                  return false;
                }
              
;              });
            }
            setusname(userName);
            setUserName("");
           setPassword("");
            setConfirmPassword("");
            
          };  
        
        return(
        <>{(!signIn && (!props.isLoggedIn && <Card>
                <form>

                <label>UserName</label>
                    <input type="text" value={userName} onChange={changeUserHandler}></input>
                    <label>Password</label>
                    <input type="password" value={password} onChange={changePasswordHandler}></input>
                    <label>Confirm Password</label>
                    <input type="password" value={confirmPassword} onChange={changeConfirmPasswordHandler}></input>
                    <div className="position">
                    <Button disabled={!valid} onClick={loginVerification} >Login</Button>

                    <Button onClick={signInHandler}>Sign In</Button>
                    </div>
                </form> 
            
                
            </Card>))})
            <>{signIn && <Card>
                <form>
                    <label>UserName</label>
                    <input type="text" value={signuserName} onChange={signchangeUserHandler}></input>
                    <label>Email</label>
                    <input type="email" value={signEmail} onChange={signchangeEmailHandler}></input>
                    <label>Password</label>
                    <input type="password" value={signpassword} onChange={signchangePasswordHandler}></input>
                    <label>Confirm Password</label>
                    <input type="password" value={signconfirmPassword} onChange={signchangeConfirmPasswordHandler}></input>
                    <div className="position">
                    <Button onClick={signUpHandler} disabled={!isvalid}>Submit</Button>
                    </div>
                </form></Card>}</>
        {validLoggedIn && (props.isLoggedIn && <Card><p>Welcome {usname} </p></Card>)}
    
            </>
        )   
    }
    export default Login;