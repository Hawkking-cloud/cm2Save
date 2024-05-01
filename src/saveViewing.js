const saveContainer = document.getElementById("saveContainer")
var testData = 'a OR Gate|0,0,0,0,0,???|gate,or|1|13|0'

function addSave(s){
    const splitted = s.split('|')
    const data = {title:splitted[0],data:splitted[1],tags:splitted[2],blocks:splitted[3],raw:splitted[4],wires:splitted[5]}
    const newDiv = document.createElement("div")
    newDiv.style.backgroundColor="rgb(80, 80, 80)";
    newDiv.style.borderRadius='15px';
    newDiv.id=data.title
    newDiv.Tags=data.tags;
    newDiv.save = data.data
    newDiv.blocks=data.blocks
    newDiv.raw=data.raw
    newDiv.wires=data.wires
    newDiv.path = splitted[6]
    saveContainer.append(newDiv)
    
    const title = document.createElement("p")
    newDiv.append(title)
    title.style.color="white"
    title.innerHTML=data.title
    title.style.marginLeft='10px'
    title.style.fontFamily= "Comfortaa, sans-serif" ;
    title.style.fontOpticalSizing='auto';
    title.style.fontStyle="normal";
    title.id=data.title+'-id'
    
    const divider = document.createElement('div')
    newDiv.append(divider)
    divider.style.height='1px';
    divider.style.width="100%";
    divider.style.backgroundColor="white";

    const copyButton = document.createElement('button')
    newDiv.append(copyButton)
    copyButton.innerHTML="Copy"
    copyButton.style.backgroundColor="rgb(25,25,25)"
    copyButton.style.borderRadius="15px";
    copyButton.style.width="125px";
    copyButton.style.color="white";
    copyButton.style.height="30px";
    copyButton.style.marginTop = "5px"
    copyButton.style.fontFamily= "Comfortaa, sans-serif" ;
    copyButton.style.fontOpticalSizing='auto';
    copyButton.style.fontStyle="normal";

    const openButton = document.createElement('button')
    newDiv.append(openButton)
    openButton.innerHTML="Open"
    openButton.style.backgroundColor="Blue"
    openButton.style.borderRadius="15px";
    openButton.style.width="125px";
    openButton.style.color="white";
    openButton.style.height="30px";
    openButton.style.fontFamily= "Comfortaa, sans-serif" ;
    openButton.style.fontOpticalSizing='auto';
    openButton.style.fontStyle="normal";
    openButton.onclick=()=>{openSave(newDiv)}

    const centerer = document.createElement("div")
    centerer.style.justifyContent="center"
    centerer.style.display='flex'
    centerer.style.height="100%"
    newDiv.append(centerer)

    const saveTextArea = document.createElement('textarea')
    centerer.append(saveTextArea)
    saveTextArea.style.width="90%"
    saveTextArea.style.marginTop='5px';
    saveTextArea.style.height ="30%"
    saveTextArea.style.backgroundColor="rgb(125,125,125)"
    saveTextArea.style.borderRadius="15px";
    saveTextArea.innerHTML=data.data
    saveTextArea.style.color='white';
    saveTextArea.addEventListener('focus', function() {
        this.style.outline = 'none';
    });
    saveTextArea.style.marginBottom='25px'
    saveTextArea.style.marginLeft='5px'
    saveTextArea.style.marginRight='5px'
    saveTextArea.style.overflow = 'hidden'
    saveTextArea.setAttribute('readonly', true);
    saveTextArea.style.resize = 'none';
    copyButton.onclick=()=>{
        try {
            saveTextArea.select();
            document.execCommand('copy');
            copyButton.style.backgroundColor='green'
            setInterval(()=> {
                copyButton.style.backgroundColor = 'black';
            }, 2000);
        } catch {
            copyButton.style.backgroundColor='red'
        }
    }

}
//addSave(testData)