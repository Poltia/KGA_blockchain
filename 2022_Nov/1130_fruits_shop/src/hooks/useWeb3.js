import { useEffect, useState } from "react";
import Web3 from "web3/dist/web3.min.js";

const useWeb3 = () => {
    const [account, setAccount] = useState();
    const [web3, setWeb3] = useState();

    // 연결된 계정 주소 가져오는 함수
    const getRequestAccount = async () => {
        const [account] = await window.ethereum.request({
            method: "eth_requestAccounts",
        });
        return account;
    };

    useEffect(() => {
        (async () => {
            const account = await getRequestAccount();
            const web3 = new Web3(window.ethereum);

            setAccount(account);
            setWeb3(web3);
        })();
    }, []);

    return [web3, account];
};

export default useWeb3;
