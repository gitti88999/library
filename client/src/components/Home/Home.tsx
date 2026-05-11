import React from "react";
import'./Home.css'
import books from '../../assets/תמונות-מאמרים-2-1200x675.png'
function Home(){
    return<>
    <div className="welcome">
<h1 className="h1">ברוכים הבאים לספריה השיתופית</h1>
<h2 className="h2">כאן ניתן לשאול ולהשאיל ספרים בקלות ובנוחות   </h2>
<button className="start" >
<p onClick={start}>התחל</p>
</button>

    </div>
    <img src={books} className="img-book"  alt=""></img>

    </>
}
function start(){

}
export default Home