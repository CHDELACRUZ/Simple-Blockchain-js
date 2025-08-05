const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");

const abi = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "donante",
                "type": "address"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "cantidad",
                "type": "uint256"
            }
        ],
        "name": "DonacionRecibida",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "donaciones",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
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
        "type": "function",
        "constant": true
    },
    {
        "inputs": [],
        "name": "donar",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function",
        "payable": true
    },
    {
        "inputs": [],
        "name": "obtenerBalance",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function",
        "constant": true
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "cantidad",
                "type": "uint256"
            }
        ],
        "name": "retirarFondos",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
];

const address = '0x845D6139a189DeF57e873521e9c61EA6f3592aaA';
const contrato = new web3.eth.Contract(abi, address);

async function actualizarBalance() {
    try {
        const balance = await contrato.methods.obtenerBalance().call();
        document.getElementById('saldo').innerText = `Saldo: ${web3.utils.fromWei(balance, 'ether')} ETH`;
    } catch (error) {
        console.error("Error al obtener el balance:", error);
    }
}

document.getElementById('donarForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const cantidad = document.getElementById('cantidad').value;

    try {
        const accounts = await web3.eth.getAccounts();
        console.log("Cuentas disponibles:", accounts);
        await contrato.methods.donar().send({
            from: accounts[0],
            value: web3.utils.toWei(cantidad, 'ether')
        });
        console.log('Donación exitosa');
        actualizarBalance();
    } catch (err) {
        console.error('Error en la donación', err);
    }
});

document.getElementById('saldo-button').addEventListener('click', function() {
    actualizarBalance();
});

// Llamar actualizarBalance al cargar la página
document.addEventListener('DOMContentLoaded', actualizarBalance);
