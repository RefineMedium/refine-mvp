var Tx = require('ethereumjs-tx');
var Web3 = require('web3')
var web3 = new Web3('https://ropsten.infura.io/cf8c0b7881354cb6bf92cbccf226899d');

// set token source, destination and amount
var myAddress = "0xCE526c88227E09ca5eEA128C651495fd12c76B4C"
var toAddress = "0x739Abd45Dcbf2E5cD6A388c91B70beCDD8FfD606"
var amount = web3.utils.toHex(5e18)
var contractAddress = "0xB1cF466455FEca6E75bBd2B34478c65Bb64571aF";
function prepareClient() {

    if (typeof web3 !== 'undefined') {
      //console.log("Web3 Already available");
      //web3 = new Web3(web3.currentProvider);
    } else {
      // set the provider you want from Web3.providers
      console.log("Web3 being set");
      web3 = new Web3(new Web3.providers.HttpProvider('https://ropsten.infura.io/cf8c0b7881354cb6bf92cbccf226899d'));
    }
    web3.eth.defaultAccount = '0xCE526c88227E09ca5eEA128C651495fd12c76B4C';
    return web3;
}

function prepareContract (client){

    var contractAbi = [
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "burn",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_subtractedValue",
        "type": "uint256"
      }
    ],
    "name": "decreaseApproval",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_addedValue",
        "type": "uint256"
      }
    ],
    "name": "increaseApproval",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_from",
        "type": "address"
      },
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "burner",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Burn",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "previousOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "newOwner",
        "type": "address"
      }
    ],
    "name": "OwnershipTransferred",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      },
      {
        "name": "_spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "remaining",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "_owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "balance",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "initialSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

var clientcontext = new client.eth.Contract(contractAbi,contractAddress,{from: myAddress});
return clientcontext;

}

async function getBalance  (address)  {

    let promise = new Promise((resolve, reject) => {
        setTimeout(() => resolve("done!"), 1000)
      });

    let client = prepareClient();
    let contract = prepareContract(client);
    var dbalance = await contract.methods.balanceOf(address).call() ;
    return Promise.resolve(dbalance); 
}
var txHash;
let sendToken = async (clientAddress) => {

    let client = prepareClient();
    let contract = prepareContract(client);
    // get transaction count, later will used as nonce
    var count = await web3.eth.getTransactionCount(myAddress);
    // set your private key here, we'll sign the transaction below
    var privateKey =  Buffer.from('F5C33002E837F9AEDAE2496AC0B98CA1A7E36CB8DEC387902806680C38542EF1', 'hex');

    var rawTransaction = {

        "from":myAddress,
        "gasPrice":web3.utils.toHex(40 * 1e9),
        "gasLimit":web3.utils.toHex(210000),
        "to":contractAddress,
        "value":"0x0",
        "data":contract.methods.transfer(clientAddress, amount).encodeABI(),"nonce":web3.utils.toHex(count),
        "chainId":3
    } 
    var transaction = new Tx(rawTransaction)
    transaction.sign(privateKey)
   
         web3.eth.sendSignedTransaction('0x' + transaction.serialize().toString('hex')).on('transactionHash', function(hash){
            console.log("transaction hash::",hash);
            txHash = hash
            
            
        })
        // If a out of gas error, the second parameter is the receipt.
}
 
function getHash (){
  return txHash;
}

module.exports = {
  sendToken:sendToken,
  getHash:getHash
  
}