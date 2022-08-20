// require in assert for testing
const assert = require('assert');
// require in the ganache client to use it's provider to deploy our contract on the local network
// https://github.com/trufflesuite/ganache#:~:text=Contributing%20%E2%80%A2%20Related-,Features,to%20make%20development%20a%20breeze.
const ganache = require('ganache-cli');
// web3, which is a interface to comunicate with the network.
const Web3 = require('web3'); // contructor or class function, therfore it's capital
const web3 = new Web3(ganache.provider());
// We import our compile file here to get the bytecode and interface
const {interface,bytecode} = require('../compile'); 


let accounts; // Variable that holds the list of ganache accounts
let inbox; // Variable that acts as an instance for our contract

// This is used to run a piece of code everytime we start a new test
beforeEach(async ()=>{
    // This gets a list of all the accounts that ganacahe created for us to test with
    accounts = await web3.eth.getAccounts();
    // deploying the code 
    inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({data:bytecode, arguments:['Hello World!']})
    .send({from:accounts[0], gas:1000000});
    /*  The compiler gives a JSON file, we want to parse it before we deploy it
        The deploy line deploys a new contract, which creats a transaction object, which has our bytecode, and args
        The Send line sends a trasnaction that creates this contract    
    */
});

// 'describe' is used to group certain tests, and 'it' is used to describe a test
describe('inbox',()=>{
    // We access the address field to make sure that we are deploying our contract to the correct location
    it('deployment sucessfull', ()=>{
        assert.ok(inbox.options.address);
    });
    // Getting our initial message
    it('Initial Message', async ()=>{
        const message = await inbox.methods.getMessage().call();
        assert.equal(message,'Hello World!');
    });
    // updating the message, also costs gas
    it('setMessage Works', async ()=>{
        await inbox.methods.setMessage("Moo").send({from:accounts[0]});
        const message = await inbox.methods.getMessage().call();    
        assert.equal(message,'Moo');
    });
});
