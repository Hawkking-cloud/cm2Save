const cm2js= {
    Block: class {
        constructor(position, id) {
            this.position = position;
            this.id = id;
            this.on=false;
            this.specialValue='';
            if(this.id.x!=undefined) console.log("CM2JS Error: Mistaked ID for Position")
            var aliases = [["not",0],["and",1],["or",2],["xor",3],["interact",4],["touch",4],["button",4],["toggle",5],["tflipflop",5],["flipflop",5],["led",6],["light",6],["text",13],["letter",13],["conductor",8],["cond",8],["xnor",11],["nand",10],["tile",14],["delay",16],["timer",16],["broad",17],["antenna",17],["antennae",17],["broadcast",17],["rand",12],["random",12],["node",15]]
            if((typeof this.id === 'string')) for(let i=0;i<aliases.length;i++){if(this.id.toLowerCase()==aliases[i][0])this.id=aliases[i][1];break;}
            
        }
    },
    Wire: class {
        constructor(block1, block2) {
            this.block1=block1;
            this.block2=block2;
        }
    },
    Save: class {
        blocks=[];
        wires=[];
        buildString="";
        buildVarString="";
        stripZeros=false;
        addBlock(block) {
            if (block instanceof cm2js.Block) {
                this.blocks.push(block);
            } else {
                console.log('CM2JS Error: Tried to use save.addBlock() when the instance isn\'t a Block');
            }
        }
        addBlockList(list) {
            for (let i = 0; i < list.length; i++) {
                const block = list[i]
                if (block instanceof cm2js.Block) {
                    this.blocks.push(block);
                } else {
                    console.log('CM2JS Error: Tried to use save.addBlock() when the instance isn\'t a Block');
                }
            }
        }
        findBlock(v){
            for (let i = 0; i < this.blocks.length; i++) {
                const p = this.blocks[i].position
                if(p.x==v.x&&p.y==v.y&&p.z==v.z){ 
                    return this.blocks[i]
                }
            }
            console.log('CM2JS Error: Tried to use save.findBlock(), Couldnt find block XYZ: '+v.x+', '+v.y+', '+v.z);
        }
        removeBlock(block) {
            if (block instanceof cm2js.Block) {
                const index = this.blocks.indexOf(block);
                if (index !== -1) {
                this.blocks.splice(index, 1);
                } else {
                console.log('CM2JS Error: Tried to call save.removeBlock() but couldn\'t find the block to remove');
                }
            } else {
                console.log('CM2JS Error: Tried to use save.removeBlock() when the instance isn\'t a Block');
            }
        }      
        addWire(wire) {
            if (wire instanceof cm2js.Wire) { 
                this.wires.push(wire);
            } else {
                console.log('CM2JS Error: Tried to use save.addWire() when the instance isn\'t a Wire');
            }
        }
        addWire2(block1,block2) {
                        
            if(block1 instanceof cm2js.Block){
                if(block2 instanceof cm2js.Block){
                    const newWire = new cm2js.Wire(block1,block2);
                    this.wires.push(newWire);
                } else {
                    console.log('CM2JS Error: Tried to use save.addWire2() when block2 isnt a Block');
                }
            } else {
                console.log('CM2JS Error: Tried to use save.addWire2() when block1 isnt a Block');
            }
        }
        removeWire(wire) {
            if (wire instanceof cm2js.Wire) {
                const index = this.wires.indexOf(wire);
                if (index !== -1) {
                this.wires.splice(index, 1);
                } else {
                console.log('CM2JS Error: Tried to call save.removeWire() but couldn\'t find the wire to remove');
                }
            } else {
                console.log('CM2JS Error: Tried to use save.removeWire() when the instance isn\'t a Wire');
            }
        }
        export(){
            let blockstring='';
            let wirestring='';
            let exportedString = '';
            for (let i = 0; i < this.blocks.length; i++) {
                const b = this.blocks[i]
                let on = b.on ? 1 : 0;  
                on=this.stripZeros&&on==0?'':on
                blockstring += `${b.id},${on},${b.position.x==0&&this.stripZeros?'':b.position.x},${b.position.y==0&&this.stripZeros?'':b.position.y},${b.position.z==0&&this.stripZeros?'':b.position.z},${b.specialValue};`;
            }
            blockstring = blockstring.slice(0, -1)
            for (let i = 0; i < this.wires.length; i++) {
                const w = this.wires[i]
                wirestring+=`${this.blocks.indexOf(w.block1)+1},${this.blocks.indexOf(w.block2)+1};`
            }
            wirestring = wirestring.slice(0, -1);
            exportedString=blockstring+'?'+wirestring+'?'+this.buildString+'?'+this.buildVarString
    
            return exportedString
        }
        import(string, offset){
            let newblocks = [];
            offset=offset||{x:0,y:0,z:0};
            const blocktext = string.split('?')[0];
            const wiretext = string.split('?')[1];
            const newindex = this.blocks.length;
            let buildStringToAdd = string.split("?")[2];
            if(buildStringToAdd.substring(buildStringToAdd.length-1,buildStringToAdd.length)!=';'){buildStringToAdd+=';'}
            this.buildString+=buildStringToAdd;
            let buildVarStringToAdd = string.split("?")[3];
            if(buildVarStringToAdd.substring(buildVarStringToAdd.length-1,buildVarStringToAdd.length)!=";")buildVarStringToAdd+=';'
            this.buildVarString+=buildVarStringToAdd;
            for (let i = 0; i < blocktext.split(';').length; i++) {
                const b = blocktext.split(';')[i]
                const params = b.split(',')
                const newblock = new cm2js.Block({x:parseFloat(params[2])+offset.x,y:parseFloat(params[3])+offset.y,z:parseFloat(params[4])+offset.z},params[0]);
                let on = params[1]==1 ? 1 : 0; 
                newblock.on=on;
                newblock.specialValue=params[5];
                newblocks.push(newblock)
            }
            this.blocks = this.blocks.concat(newblocks);
            if(wiretext&&wiretext!=''){
                for (let i = 0; i < wiretext.split(';').length; i++) {
                    const b1 = wiretext.split(';')[i].split(',')[0];
                    const b2 = wiretext.split(';')[i].split(',')[1]
                    if(this.blocks[parseInt(b1)+newindex-1]&&this.blocks[parseInt(b2)+newindex-1]){
                        this.wires.push(new cm2js.Wire(this.blocks[parseInt(b1)+newindex-1],this.blocks[parseInt(b2)+newindex-1]))
                    } else {
                        console.log('CM2JS Error: save.import() error - Wire ('+(parseInt(b1)+newindex)+','+(parseInt(b2)+newindex)+') Could not be found');
                    }
                }
            }
        }
        parsePos(position) {
            for(let i = 0; i<this.blocks.length;i++){
                if(this.blocks[i].position==position){
                    return true;
                }
            }
            return false;
        }
    },
    v: function v(x, y, z) {
        return { x: typeof x === "number" ? x : 0, y: typeof y === "number" ? y : 0, z: rz = typeof z === "number" ? z : 0 };
    }
}