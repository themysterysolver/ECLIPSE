let moon=document.getElementById("moon");
moon.addEventListener("mousedown",function(event){
    document.addEventListener("mousemove",moveMoon);
    document.addEventListener("mouseup",()=>
    {
        document.removeEventListener("mousemove",moveMoon);
    }
    );
});

function moveMoon(e){
    moon.style.left=`${e.clientX}px`;
    moon.style.top=`${e.clientY}px`;
}