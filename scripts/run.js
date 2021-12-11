const main = async () => {
    const vimContractFactory = await hre.ethers.getContractFactory('Vim');
    const vimContract = await vimContractFactory.deploy({
        value: hre.ethers.utils.parseEther('0.1'),
    });
    await vimContract.deployed();
    console.log("Contract deployed to:", vimContract.address);

    let contractBalance = await hre.ethers.provider.getBalance(
        vimContract.address
    );
    console.log(
        'Contract bal:',
        hre.ethers.utils.formatEther(contractBalance)
    );

    const exitTxn = await vimContract.exitVim('Heeeelp! 1');
    await exitTxn.wait();

    const exitTxn2 = await vimContract.exitVim('Heeeelp! 2');
    await exitTxn2.wait();

    contractBalance = await hre.ethers.provider.getBalance(
        vimContract.address
    );
    console.log(
        'Contract bal:',
        hre.ethers.utils.formatEther(contractBalance)
    );

    let allExits = await vimContract.getAllExits();
    console.log(allExits);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

runMain();