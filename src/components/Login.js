import React,{useEffect} from "react";
import { useNavigate } from "react-router-dom";
const Login = ()=>{
    const [email,setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const navigate = useNavigate();
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate("/");
        }
    })
    const handleLogin= async ()=>{
        console.log("email,Password",email,password);
        
        let result = await fetch('http://localhost:5100/login',{
            method:'POST',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        if(result.name){
            localStorage.setItem("user",JSON.stringify({result}));
            navigate("/");
        }else{
            alert("Please Enter correct details");
        }
    }
    return(
        <div className='login' > 
            <h1>Login</h1>
            <input type='text' className="inputBox" placeholder='Enter email' 
            value={email}  onChange = {((e)=>setEmail(e.target.value))} />

            <input type="number" className="inputBox" placeholder='Enter Password'
            onChange = {((e)=>setPassword(e.target.value))} value={password}/>

            <button onClick={handleLogin} className="appButton" type="button" >Login</button>
        </div>
    )
}

export default Login;