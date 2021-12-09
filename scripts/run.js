const main = async () => {
    const waveContractFactory = await hre.ethers.getContractFactory('WavePortal');
    const waveContract = await waveContractFactory.deploy();
    console.log("Contract deployed to:", waveContract.address);
};

const runMain = async () => {
    try {
        
    }
}