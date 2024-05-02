const containerDiv3 = document.getElementById('saveEditorDiv2')
const blurdiv3 = document.getElementById('blurdiv3')
let blurred3=false;

containerDiv3.style.display='none';
function editTXT(data){
    api.send('edit', data)
}
function check(titleD,saveD,tagD,unique=true){
    let ret = '';
    if(titleD===''||titleD===" "){
        ret="Input something for a title"

    } else if (titleD.indexOf("|")>-1) {
        ret="Title can not contain pipes (these: |)"
    } else if (saveD.indexOf("|")>-1) {
        ret="Save can not contain pipes (these: |)"
    } else if (tagD.indexOf("|")>-1) {
        ret="Tags can not contain pipes (these: |)"

    } else if (titleD.indexOf('"')>-1) {
        ret='Titles can not contain quotes (these: ")'
    } else if (saveD.indexOf('"')>-1) {
        ret='Save can not contain quotes (these: ")'
    } else if (tagD.indexOf('"')>-1) {
        ret='Tags can not contain quotes (these: ")'

    } else if (titleD.indexOf('_')>-1) {
        ret='Titles can not contain underscores (these: _)'
    } else if (saveD.indexOf('_')>-1) {
        ret='Save can not contain underscores (these: _)'
    } else if (tagD.indexOf('_')>-1) {
        ret='Tags can not contain underscores (these: _)'

    } else if (checkUnique(titleD)&&unique){
        ret="Title must be unique"
    } else if (saveD===''||saveD===" ") {
        ret="Input a valid save file"
    }
    return ret;
}

function editSave2(path,title,data,tags){    
    console.log(path)
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
        const safe = check(titleData,saveData,tagsData,false)
        if(safe==''){
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
                output.innerHTML = "Successfully Created!";
                blurred3=false;
                blurdiv3.style.filter = 'blur(0px)'
                containerDiv3.style.display='none'
                document.getElementById('editTitle2').value=''
                document.getElementById('editSave').value=''
                document.getElementById('editTags').value=''
                editTXT([titleData,`${titleData}|${saveData}|${tagsData}|${save.blocks.length}|${saveData.length}|${save.wires.length}`,path]); 
                const thingToSet = document.getElementById(title)
                thingToSet.id=titleData
                thingToSet.save=saveData
                thingToSet.path=titleData+'.txt'
                thingToSet.Tags=tagsData
                thingToSet.blocks=save.blocks.length
                thingToSet.raw=saveData.length
                thingToSet.wires=save.wires.length
                document.getElementById(title+'-id').innerHTML=titleData;
                document.getElementById(title+'-id').id=titleData+'-id'
                output.style.color = "rgb(0,200,0)";
            }
        } else {
            output.innerHTML=safe;
        }
        
        
    }
}   