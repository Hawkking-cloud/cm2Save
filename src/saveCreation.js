const containerDiv2 = document.getElementById('saveCreatorDiv')
const blurdiv2 = document.getElementById('blurdiv2')
let blurred2=false;
containerDiv2.style.display='none';
function saveTXT(data){
    api.send('write', data)
}
function checkUnique(s,exclude=''){
    const saveContainer2 = document.getElementById("saveContainer")
    for(let i=0;i<saveContainer2.children.length;i++){
        if(saveContainer2.children[i].id===s&&s!=exclude)return true;
    }
    return false;
}
function createSave(){
    blurdiv2.onclick=null
    blurred2=true;
    blurdiv2.style.filter = 'blur(5px)'
    containerDiv2.style.display=''
    setInterval(() => {
        blurdiv2.onclick=()=>{
            blurred2=false;
            blurdiv2.style.filter = 'blur(0px)'
            containerDiv2.style.display='none'
            document.getElementById('createTitle').value=''
            document.getElementById('createSave').value=''
            document.getElementById('createTags').value=''
        }
    }, 1);
    const button = document.getElementById('createButton')
    const output = document.getElementById('createOutput')
    button.onclick=()=>{
        let titleDataC = document.getElementById('createTitle').value
        let saveDataC = document.getElementById('createSave').value
        let tagsDataC = document.getElementById('createTags').value
        output.style.color='rgb(125,0,0)';
        const safe2 = check(titleDataC,saveDataC,tagsDataC)
        
        if(safe2==''){
            output.style.color='rgb(0,200,0)';
            try {
                const save = new cm2js.Save();
                save.import(saveDataC);
                saveTXT(`${titleDataC}|${saveDataC}|${tagsDataC}|${save.blocks.length}|${saveDataC.length}|${save.wires.length}`);
                output.innerHTML = "Successfully Created!";
                
                document.getElementById('createTitle').value="";
                document.getElementById('createSave').value="";
                document.getElementById('createTags').value="";
            } catch (error) {
                console.error("Error:", error);
                output.innerHTML = "Input a valid save file";
                output.style.color = "rgb(125,0,0)";
            }
        } else {
            output.innerHTML=safe2
        }
       
        
    }
}   