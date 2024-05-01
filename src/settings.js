const sContainer = document.getElementById('settingsPage')
const sBlurDiv = document.getElementById('blurdiv4')
let sBlur=false;
const settingsVar=[
{"name":"Decode blocks when opening saves: ","type":"toggle","alias":"decodeBlocks"},
{"name":"Wipe TXT File Cache","type":"button","alias":"","onclick":()=>{api.send("wipeCache")},},
{"name":"Open TXT File Cache","type":"button","alias":"","onclick":()=>{api.send("openCache")},},
{"name":"Open Saves Folder","type":"button","alias":"","onclick":()=>{api.send("openSaves")},},
]
const Settings2 = {}
sContainer.style.display='none';
for(let i=0;i<settingsVar.length;i++){
    let setting2 = settingsVar[i];
    let alias = setting2.alias
    Settings2[alias]=(localStorage.getItem("cm2Save-"+alias))
    let newSettingDiv = document.createElement('div')
    newSettingDiv.style.display='flex'; 
    document.getElementById('settingsContainer').append(newSettingDiv)
    let newSettingName = document.createElement('p')
    newSettingDiv.style.color='white';
    newSettingName.innerHTML=setting2.name
    newSettingDiv.append(newSettingName)
    if(setting2.type=="toggle"){
        let toggleButton = document.createElement('button')
        newSettingDiv.append(toggleButton)
        toggleButton.style.width="50px";
        toggleButton.style.height="50px";
        toggleButton.style.borderRadius='500px'; 
        toggleButton.style.backgroundColor=Settings2[alias]=='true'?"green":"red"
        Settings2[alias]=!(Settings2[alias]=='true')
        Settings2[alias]=!(Settings2[alias])
        toggleButton.onclick=()=>{
            
            Settings2[alias]=!(Settings2[alias])
            Settings2[alias]?toggleButton.style.backgroundColor="green":toggleButton.style.backgroundColor="red"  
            localStorage.setItem("cm2Save-"+alias,Settings2[alias])
        }
    }
    if(setting2.type=="button"){
        let settingButton2 = document.createElement('button')
        newSettingDiv.append(settingButton2)
        settingButton2.style.width="50px";
        settingButton2.style.height="50px";
        settingButton2.style.borderRadius='500px'; 
        settingButton2.style.backgroundColor="rgb(175,175,175)"
        settingButton2.onclick=setting2.onclick
    }
}
function openSettings(){   
    sBlurDiv.onclick=null
    sBlur=true;
    sBlurDiv.style.filter = 'blur(5px)'
    sContainer.style.display=''
    setInterval(() => {
        sBlurDiv.onclick=()=>{
            sBlur=false;
            sBlurDiv.style.filter = 'blur(0px)'
            sContainer.style.display='none'
        }
    }, 1);
}   