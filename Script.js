const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const contractABI = [ /* Paste your contract ABI here */ ];

async function connectWallet() {
    if (!window.ethereum) return alert("MetaMask required!");
    await window.ethereum.request({ method: "eth_requestAccounts" });
}

async function sendMessage() {
    await connectWallet();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const receiver = document.getElementById("receiver").value;
    const message = document.getElementById("message").value;

    await contract.sendMessage(receiver, message);
    alert("Message sent!");
    loadMessages();
}

async function loadMessages() {
    await connectWallet();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    const messages = await contract.getMessages();
    document.getElementById("messages").innerHTML = messages.map(m => `<p><strong>${m.sender}</strong>: ${m.text}</p>`).join("");
}

loadMessages();
