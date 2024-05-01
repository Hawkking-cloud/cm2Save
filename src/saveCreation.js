const containerDiv2 = document.getElementById('saveCreatorDiv')
const blurdiv2 = document.getElementById('blurdiv2')
let blurred2=false;
containerDiv2.style.display='none';
function saveTXT(data){
    api.send('write', data)
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
        }
    }, 1);
    const button = document.getElementById('createButton')
    const output = document.getElementById('createOutput')
    button.onclick=()=>{
        let titleData = document.getElementById('createTitle').value
        let saveData = document.getElementById('createSave').value
        let tagsData = document.getElementById('createTags').value
        output.style.color='rgb(125,0,0)';
        if(titleData===''||titleData===" "){
            output.innerHTML="Input something for a title"
        } else if (saveData===''||saveData===" ") {
            output.innerHTML="Input a valid save file"
        } else {
            output.style.color='rgb(0,200,0)';
            try {
                const save = new cm2js.Save();
                save.import(saveData);
                saveTXT(`${titleData}|${saveData}|${tagsData}|${save.blocks.length}|${saveData.length}|${save.wires.length}`);
                output.innerHTML = "Successfully Created!";
                
                document.getElementById('createTitle').value=""
                document.getElementById('createSave').value=""
                document.getElementById('createTags').value=""
            } catch (error) {
                console.error("Error:", error);
                output.innerHTML = "Input a valid save file";
                output.style.color = "rgb(125,0,0)";
            }
           
        }
    }
}   