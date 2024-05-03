
                    
const containerDivRend = document.getElementById('renderPage')
const blurdiv5 = document.getElementById('blurdiv5')
let blurred5=false;

containerDivRend.style.display='none';

function renderSave(save){    
    blurdiv5.onclick=null
    blurred5=true;
    blurdiv5.style.filter = 'blur(5px)'
    containerDivRend.style.display=''
    setInterval(() => {
        blurdiv5.onclick=()=>{
            blurred5=false;
            blurdiv5.style.filter = 'blur(0px)'
            containerDivRend.style.display='none'
        }
    }, 1);
    api.send("requestRender",save.save)
}   