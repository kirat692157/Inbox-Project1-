/* 
    Inbuilt module used to complete the
    path to our files or contracts    
*/
const path = require('path');
/*
    This is another inbult module that we use to 
    read the data from out files. We basically use this 
    to read out the data into a variable whic we will
    later use to compile 
*/
const fs = require('fs');
/* 
    This is the compilation module we use
    We import this into out folder using git-bash

    Command: npm install save solc

*/ 
const solc = require('solc')
/* 
    This is a call used to find the path to our source file.
    Which has the solidity code.
    We will use this to reach our file
    @param1 is the address to out inbox or root folder
    @param2 and @param 3 are the names of our files in the folder
*/
const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
/* 
    This function is used to read the contents of the file
    at the path specified into the variable src
    @param2 is the encoding type used in the files
*/
const src = fs.readFileSync(inboxPath,'utf8');
/* 
    This is the compile statment
    The module.exports makes it so that we can
    require in the compiled file into other files 
    @param2 is the number of contracts
*/
module.exports = solc.compile(src,1).contracts[':Inbox'];
