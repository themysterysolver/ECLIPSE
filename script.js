const sun=document.getElementById("sun");
const moon=document.getElementById("moon");
const bod=document.body;
let offsetX,offsetY;

moon.addEventListener("mousedown",function(e){
    offsetX=e.clientX-moon.offsetLeft;
    offsetY=e.clientY-moon.offsetTop;
    document.addEventListener("mousemove",moveMoon);
    document.addEventListener("mouseup",()=>
    {
        document.removeEventListener("mousemove",moveMoon);
    }
    );
});

function moveMoon(e){
    let {x,y}=withinBound(e.clientX-offsetX,e.clientY-offsetY);
    moon.style.left=`${x}px`;
    moon.style.top=`${y}px`;
}

function withinBound(x,y){
    let screenWidth=window.innerWidth;
    let screenHeight=window.innerHeight;
    let moonSize=moon.offsetWidth;
    return {
        x:Math.max(0,Math.min(x,screenWidth-moonSize)),
        y:Math.max(0,Math.min(y,screenHeight-moonSize))
    }
}