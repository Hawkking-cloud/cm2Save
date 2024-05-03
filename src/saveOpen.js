const containerDiv = document.getElementById('saveEditorDiv')
const blurdiv = document.getElementById('blurdiv');
const saveDataDisplay = document.getElementById('saveDataDisplay')
let blurred=false;
containerDiv.style.display='none';
function openSave(save){
    blurdiv.onclick=null
    blurred=true;
    blurdiv.style.filter = 'blur(5px)'
    containerDiv.style.display=''
    setInterval(() => {
        blurdiv.onclick=()=>{
            blurred=false;
            blurdiv.style.filter = 'blur(0px)'
            containerDiv.style.display='none'
        }
    }, 1);
    document.getElementById('editTitle').innerText=save.id
    if(Settings2.decodeBlocks==true){
        let stringToAdd = '';
        const save2 = new cm2js.Save()
        save2.import(save.save)
        const blocks = ["NOT",'AND','OR','XOR',"Button","Toggle","LED","Sound Block","Conductor","Custom Block","NAND","XNOR","Random Block", "Char Block","Tile","Node","Delay Block","Antenna", "Conductor V2"]
        let blockInts = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
        for(let i=0;i<save2.blocks.length;i++){
            blockInts[save2.blocks[i].id]++;
        }
        for(let i=0;i<blocks.length;i++){
            if(blockInts[i]>0){stringToAdd+=`${blocks[i]}s:${blockInts[i]}\r\n`}
            
        }
        saveDataDisplay.innerText="Raw: "+save.raw+'\r\nBlocks: '+save.blocks+'\r\nWires: '+save.wires+`\r\n${stringToAdd.replace('NaN','').replace('undefined','')}`

    } else {
        saveDataDisplay.innerText="Raw: "+save.raw+'\r\nBlocks: '+save.blocks+'\r\nWires: '+save.wires+'\r\ndecode blocks is disabled in settings'

    }
    
    
    document.getElementById("editSaveButton").onclick=()=>{
        blurred=false;
        blurdiv.style.filter = 'blur(0px)'
        containerDiv.style.display='none'
        editSave2(save.path,save.id,save.save,save.Tags)
    }
    document.getElementById("deleteSaveButton").onclick=()=>{
        api.send('delete', save.path)
        document.getElementById(save.id).remove()
        blurred=false;
        blurdiv.style.filter = 'blur(0px)'
        containerDiv.style.display='none'
    }
    document.getElementById("convertSaveButton").onclick=()=>{
        api.send('convert', save.path)
    }
    
    document.getElementById("renderSaveButton").onclick=()=>{
        blurred=false;
        blurdiv.style.filter = 'blur(0px)'
        containerDiv.style.display='none'
        renderSave(save)
    }
} 