<h1 align="center">Blockchain</h1>

# What is a Blockchain?

A blockchain originally is a growing list of records, called blocks, that are linked using cryptography. Each block contains a cryptographic hash of the previous block, a timestamp, and the data of the block. This makes each block dependent from the previous one, creating, this way, a relation among the blocks.

## What is a hash?
A hash is a fixed length string that is built with a hash function. This function recieves an input and return a hash as output. If the putput is modified the hash will be
entirely different, even though only one character was changed.
There are many hash functions, some of them are:
*SHA256
*MD5
*SHA
In this example, we will use SHA256.
The reason why we will use SHA256 is that the hash obtained from the function can no be reversed, so the hash will be used with comparison purposes only.

## Where is it used?
It is mainly used in cryptocurrency. For example:
*Bitcoin
*Etherum
*Monero
The reason why this technology is used is because cryptocurrencies use decentralized control, this means that there is not only computer that verifies the integrity of the blocks, instead there are many computers, called nodes, verifying the blocks, so if a block is modified by one of the nodes all of the the other nodes will see that a block has been altered and the node that did that will be banned.

# Building a simple Blockchain
Here i will provide a quick guide on how to build a simple Blockchain using javascript with node.js

## Install Node on your system

_[Check the docs based on your OS](https://nodejs.dev/learn/how-to-install-nodejs)_

## Setting up the environment
We create a folder named Blockchain and then we initialize a node repository from the command prompt with the following command:
```
npm init
```

## Installing dependencies
We just need the crypto-js library, so we install it from the command prompt like this:
```
npm install crypto-js --save
```

## Writing the Javascript code
First we will create a file called blockchain.js.
Inside the file we will first requiere the hash function from the library that was previously installed.
```javascript
const SHA256= require ('crypto-js/sha256');
```
### Writing the block model
We need to create a model for each block that will be created.
```javascript
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
```
The function createHash() will return the hash of the block so that it can be identified with that hash.
Note that the constructor requires a previousHash value, this will be used to keep the relation between the blocks

### Writing a function to create many blocks
First we create the variable where the created blocks will be saved:
```javascript
var blocks=[]
```
Then we create a function with a for loop
```javascript
function crearBloques(num_bloques,array) {
    for (let index = 0; index < num_bloques; index++) {
        if (index==0) {
            array.push(new Block(index,'prueba',null))
        }else{
            array.push(new Block(index,'prueba',array[index-1].hash))
        }
    }
}
```
Note that the first block will not contain a previous hash value.

And we call the function
```javascript
crearBloques(3,blocks)
```

### Printing the blocks
We create a function that will print the blocks that where created
```javascript
function listarBloques(array) {
    for (let index = 0; index < array.length; index++) {
            console.log(JSON.stringify(array[index],null,2));
        }
    }
```
And we call the function
```javascript
listarBloques(blocks)
```
## Now lets see what happens when we modify one block

### Creating a get Hash function
```javascript
function getHash(block) {
    return SHA256(block.index+block.date+block.data+block.previousHash).toString()
    }
```

### Creating a verify function
We first need to create a function that will check if the data inside of the block has been modified. If the data inside the block has been modified the hash contained in the block will be different from the new one.
```javascript
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
```

### Altering the data
```javascript
blocks[1].data='nada raro por aca'
```

### Calling the verify function
```javascript
verificarHash(blocks)
```
Now check the output.
