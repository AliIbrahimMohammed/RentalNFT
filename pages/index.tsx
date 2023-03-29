import { ConnectWallet, MediaRenderer, useAddress, useContract, useContractRead, useNFT } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const address = useAddress();
  const contractAddress = "0x78B726a5Ada66D8f2EfCa612A1a092A2BAE8dEB2";

  const {contract} = useContract(contractAddress);
  const {data: nft0 } = useNFT(contract,0);
  const {data: nft1 } = useNFT(contract,1);
  const {data: userAddress, isLoading: userLoading} = useContractRead(contract,"userOf",1);
  const {data: ownerAddress, isLoading: ownerLoading} = useContractRead(contract,"ownerOf",0);
  

  let message = "";

  if(address== ownerAddress){
    message="you are the owner of this NFT"
  }else if(address == userAddress){
    message="you have user access to this NFT"
  }else{
    message="you do not have access to this NFT"
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://github.com/AliIbrahimMohammed">Rentabl NFTs</a>
        </h1>
        <ConnectWallet/>
        <br   />
          {userLoading && ownerLoading ?(
            <h3>Loading...</h3>
          ):(
            <div>
              <center>
                <MediaRenderer
                  src={nft1?.metadata.image}
                  height="450px"
                  width="400px"
                />
                <h2>{message}</h2>
                <h3>Owner: {ownerAddress}</h3>
                <h3>User: {userAddress}</h3>
              </center>
            </div>
          )}
      </main>
    </div>
  );
};

export default Home;
