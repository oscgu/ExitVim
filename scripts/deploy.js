const main = async () => {
    const vimContractFactory = await hre.ethers.getContractFactory('Vim');
    const vimContract = await vimContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.001')
    });

    await vimContract.deployed();
    console.log('Vim adress:', vimContract.address);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

runMain();