const containerDiv3 = document.getElementById('saveEditorDiv2')
const blurdiv3 = document.getElementById('blurdiv3')
let blurred3=false;

containerDiv3.style.display='none';
function editTXT(data){
    api.send('edit', data)
}
function editSave2(path,title,data,tags){    
    blurdiv3.onclick=null
    blurred3=true;
    blurdiv3.style.filter = 'blur(5px)'
    containerDiv3.style.display=''
    setInterval(() => {
        blurdiv3.onclick=()=>{
            blurred3=false;
            blurdiv3.style.filter = 'blur(0px)'
            containerDiv3.style.display='none'
        }
    }, 1);
    const button = document.getElementById('editButton')
    const output = document.getElementById('editOutput')
    document.getElementById('editTitle2').value=title
    document.getElementById('editSave').value=data
    document.getElementById('editTags').value=tags
    button.onclick=()=>{
        let titleData = document.getElementById('editTitle2').value
        let saveData = document.getElementById('editSave').value
        let tagsData = document.getElementById('editTags').value
        output.style.color='rgb(125,0,0)';
        if(titleData===''||titleData===" "){
            output.innerHTML="Input something for a title"
        } else if (saveData===''||saveData===" ") {
            output.innerHTML="Input a valid save file"
        } else {
            const save = new cm2js.Save();
            let suc = true;
            try {
                save.import(saveData);
                
            } catch (error) {
                suc=false;
                output.innerHTML = "Input a valid save file";
                output.style.color = "rgb(125,0,0)";
            }
            if(suc){
                editTXT([path,`${titleData}|${saveData}|${tagsData}|${save.blocks.length}|${saveData.length}|${save.wires.length}`]);
                const thingToSet = document.getElementById(title)
                thingToSet.id=titleData
                thingToSet.save=saveData
                thingToSet.Tags=tagsData
                document.getElementById(title+'-id').innerHTML=titleData;
                document.getElementById(title+'-id').id=titleData+'-id'
                output.style.color = "rgb(0,200,0)";
                output.innerHTML = "Successfully Created!";
            }
        }
    }
}   