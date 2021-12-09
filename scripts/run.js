const main = async () => {
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const vimContractFactory = await hre.ethers.getContractFactory('Vim');
    const vimContract = await vimContractFactory.deploy();

    console.log("Contract deployed to:", vimContract.address);
    console.log("Contract deployed by:", owner.address);

    let exitCount;
    exitCount = await vimContract.getTotalExits();

    let exitTxn = await vimContract.exitVim();
    await exitTxn.wait();

    exitCount = await vimContract.getTotalExits();

    exitTxn = await vimContract.connect(randomPerson).exitVim();
    await exitTxn.wait();

    exitCount = await vimContract.getTotalExits();
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