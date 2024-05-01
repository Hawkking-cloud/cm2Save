function searchFor(string){
    for(let i=0;i<saveContainer.children.length;i++){
        let child = saveContainer.children[i]
        if(string=='all'){
            child.style.display = '';
        } else {
            child.style.display = 'none';
        } 

        
        
        for (let j = 0; j < child.Tags.length; j++) {
            let tag = child.Tags.split(',')[j];
            if (string.includes(tag)) {
                child.style.display = '';
                console.log(`${tag} is contained in ${string}`)
            }
        }
        
        for (let j = 0; j < child.id.split(' ').length; j++) {
            let tag = child.id.split(' ')[j];
            if (string.includes(tag)) {
                child.style.display = '';
                console.log(`${tag} is contained in ${string}`)
            }
        }
    }
    
}
document.getElementById('searchbar').oninput=()=>{
    document.getElementById('searchbar').value==''?searchFor('all'):searchFor(document.getElementById('searchbar').value)
}