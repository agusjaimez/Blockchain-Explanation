//Importando el algoritmo de hash
const SHA256= require ('crypto-js/sha256');

//Creacion del modelo del bloque
class Block{
    constructor(index, data, previousHash){
        this.index= index;
        this.date=new Date();
        this.data=data;
        this.previousHash=previousHash;
        this.hash=this.createHash();
    }

    createHash(){
        return SHA256(this.index+this.date+this.data+this.previousHash).toString()
    }

}

//Funcion para crear bloques
var blocks=[]
function crearBloques(num_bloques,array) {
    for (let index = 0; index < num_bloques; index++) {
        if (index==0) {
            array.push(new Block(index,'prueba',null))
        }else{
            array.push(new Block(index,'prueba',array[index-1].hash))
        }
    }
}


//Funcion para listar bloques
function listarBloques(array) {
    for (let index = 0; index < array.length; index++) {
            console.log(JSON.stringify(array[index],null,2));
        }
    }

//Funcion para obtener hash nuevamente
function getHash(block) {
    return SHA256(block.index+block.date+block.data+block.previousHash).toString()
    }

//Funcion para corroborar que el hash no haya cambiado
function verificarHash(array){
    for (let index = 0; index < array.length; index++) {
        if (array[index].hash==getHash(array[index])) {
            console.log('El bloque '+index+' no ha sido modificado')
        }else{
            console.log('El bloque '+index+' ha sido modificado \n Hash original:'+array[index].hash+'\n Hash modificado:'+getHash(array[index]))
            console.log(JSON.stringify(array[index],null,2));
        }
        
    }
}
crearBloques(3,blocks)
listarBloques(blocks)

//Alterando bloques
blocks[1].data='nada raro por aca'
verificarHash(blocks)