import React from "react";
import './Login.css'
function Login(){
    return<>
    <div className="box">
    <button className="button">sign-in</button>
    <button className="button">sign-up</button>
    <input type="email" placeholder="enter username or email address"/>
    <input type="password" placeholder="enter password"/>
    </div>
    </>
}
export default Login