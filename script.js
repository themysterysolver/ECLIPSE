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
    updateBackGround();
}
function areaOverlap(){
    let moonRect=moon.getBoundingClientRect();
    let sunRect=sun.getBoundingClientRect();
    let x=Math.max(0,Math.min(sunRect.right,moonRect.right)-Math.max(moonRect.left,sunRect.left));
    let y=Math.max(0,Math.min(sunRect.bottom,moonRect.bottom)-Math.max(moonRect.top,sunRect.top));
    return (x*y)/(sunRect.width*sunRect.height);
}
function updateBackGround(){
    let overlap=areaOverlap();
    if(overlap>0){
        moon.classList.add("overlapping");
    }else{
        moon.classList.remove("overlapping");
    }

    //rgb(65, 163, 243);
    let r1=65,g1=163,b1=243;

    //rgb(112, 0, 67))
    let r2=112,g2=0,b2=67;

    let newR=Math.round(r1+(r2 - r1)*overlap);
    let newG=Math.round(g1+(g2 - g1)*overlap);
    let newB=Math.round(b1+(b2 - b1)*overlap);

    bod.style.backgroundColor = `rgb(${newR}, ${newG}, ${newB})`;
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