const containerDiv3 = document.getElementById('saveEditorDiv2')
const blurdiv3 = document.getElementById('blurdiv3')
let blurred3=false;

containerDiv3.style.display='none';
function editTXT(data){
    api.send('edit', data)
}
splitted[6]
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
            document.getElementById('editTitle2').value=''
            document.getElementById('editSave').value=''
            document.getElementById('editTags').value=''
        }
    }, 1);
    const button = document.getElementById('editButton')
    const output = document.getElementById('editOutput')
    document.getElementById('editTitle2').value=''
    document.getElementById('editSave').value=''
    document.getElementById('editTags').value=''
    document.getElementById('editTitle2').value=title
    document.getElementById('editSave').value=data
    document.getElementById('editTags').value=tags
    button.onclick=()=>{
        output.innerHTML=''
        let titleData = document.getElementById('editTitle2').value
        let saveData = document.getElementById('editSave').value
        let tagsData = document.getElementById('editTags').value
        output.style.color='rgb(125,0,0)';
        if(titleData===''||titleData===" "){
            output.innerHTML="Input something for a title"

        } else if (titleData.indexOf("|")>0) {
            output.innerHTML="Title can not contain pipes (these: |)"
        } else if (saveData.indexOf("|")>0) {
            output.innerHTML="Save can not contain pipes (these: |)"
        } else if (tagsData.indexOf("|")>0) {
            output.innerHTML="Tags can not contain pipes (these: |)"

        } else if (checkUnique(titleData)){
            output.innerHTML="Title must be unique"
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
                if(titleData!=title){
                    api.send('rename',[path,titleData])
                }
                output.innerHTML = "Successfully Created!";
            }
        }
    }
}   