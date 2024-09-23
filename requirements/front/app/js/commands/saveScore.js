import  Web3 from "web3";

const web3 = new Web3(import.meta.env.VITE_SEPOLIA_ADDRESS);
const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "OwnableInvalidOwner",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "OwnableUnauthorizedAccount",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "player1",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "player2",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "player1Score",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "player2Score",
				"type": "uint8"
			}
		],
		"name": "GameSaved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "counter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "games",
		"outputs": [
			{
				"internalType": "string",
				"name": "player1",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "player2",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "player1Score",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "player2Score",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_player1",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_player2",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "_player1Score",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "_player2Score",
				"type": "uint8"
			}
		],
		"name": "saveGameScore",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

export async function saveGameScore(player1, player2, player1Score, player2Score) {
	const contract = new web3.eth.Contract(abi, contractAddress);
	const account = web3.eth.accounts.privateKeyToAccount(
		import.meta.env.VITE_PRIVATE_KEY_BLOCKCHAIN
	);
	web3.eth.accounts.wallet.add(account);

	try {
		const result = await contract.methods
		.saveGameScore(player1, player2, player1Score, player2Score)
		.send({ from: account.address });
		return result
	} catch (e) {
		console.error(e);
	}
}
