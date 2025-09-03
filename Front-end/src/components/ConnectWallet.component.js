import React, { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import { ethers } from "ethers";

const InfoBox = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: 8,
    marginTop: 8
});

const ConnectWallet = () => {
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [network, setNetwork] = useState(null);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                const userAddress = accounts[0];
                setAccount(userAddress);

                const provider = new ethers.BrowserProvider(window.ethereum);

                const balanceWei = await provider.getBalance(userAddress);
                const balanceEth = ethers.formatEther(balanceWei);
                setBalance(parseFloat(balanceEth).toFixed(4));

                // Get Network Info
                const networkInfo = await provider.getNetwork();
                setNetwork(networkInfo.name || networkInfo.chainId);

                console.log("Wallet:", userAddress);
                console.log("Balance:", balanceEth);
                console.log("Network:", networkInfo);
            } catch (err) {
                console.error("Error connecting wallet:", err);
            }
        } else {
            alert("MetaMask not installed!");
        }
    };

    return (
        <Box sx={{ display: "flex", alignItems: "center", flexDirection: "column", padding: "64px" }}>
            <Button onClick={connectWallet} variant="contained">
                {account ? `Connected: ${account}` : "Connect Wallet"}
            </Button>
            <Box>
                {account && (
                    <Box>
                        <InfoBox>
                            <Chip label="Address" color="primary" variant="outlined"/>
                            <Box>{account}</Box>
                        </InfoBox>

                        <InfoBox>
                            <Chip label="Balance" color="primary" variant="outlined"/>
                            <Box>{balance}</Box>
                        </InfoBox>

                        <InfoBox>
                            <Chip label="Network" color="primary" variant="outlined"/>
                            <Box>{network}</Box>
                        </InfoBox>
                    </Box>
                )}
            </Box>
        </Box>
    );
}

export default ConnectWallet;