import React, { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Particle from '../components/Particle'
import { Typography } from '@mui/material'
import Lottie from 'react-lottie'
import animationdata from '../lottie/118002-warning.json'
import { ConnectKitButton, useSIWE } from "connectkit"
import {
  useAccount,
  useContractRead,
} from "wagmi";
import zkpVaultABI from "../zkVault.json"

import './Verification.css'


const snarkjs = window.snarkjs;


const Verification = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationdata,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const { address, isConnected } = useAccount();

  const verifierContractAddress = "0x516155d6A72aC42dC923CFcCd084Fb858659aE48"

  const [verified, setVerified] = useState(false)



    const zkpVaultContractConfig = {
      address: "0xb4Cd7f0D696a8A178dd560dCF01C8aa3F95a87d6",
      abi: zkpVaultABI.abi,
      chainId: 11155111,
    };

    const addressVerified = useContractRead({
      ...zkpVaultContractConfig,
      functionName: "validateAttribute",
      watch: true,
      args: [address, verifierContractAddress],
      onError(err) {
        setVerified(false);
        console.log("error bro", err)
      },
      onSuccess(data) {
        console.log("success bro")
        setVerified(true);
      },
    });


  return (
    <>
      <div className='container' style={{ display: 'flex' }}>
        <div style={{ backgroundColor: 'black', flex: 1, height: '100vh' }}>
          <Canvas camera={{ position: [0, 0, 6] }}>
            <Particle />
          </Canvas>

        </div>
        <div style={{ backgroundColor: 'black', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className='card-container' style={{ padding: '20px', display: 'block', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
            <Lottie
              options={defaultOptions}
              height={80}
              width={80} />
            <div style={{ position: 'absolute', top: 24, right: 24 }} >
              <ConnectKitButton />

            </div>
            { verified ? 
              <Typography variant='h2' align='center' sx={{ color: 'rebeccapurple' }}>
                User is verified
              </Typography> 
              : <Typography variant='h2' align='center' sx={{ color: 'rebeccapurple' }}>
                User is not verified
              </Typography>
              }

          </div>
        </div>
      </div>
    </>

  )
}

export default Verification