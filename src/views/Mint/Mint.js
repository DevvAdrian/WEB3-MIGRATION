import React, { useState, useMemo } from 'react';
import Page from '../../components/Page';
import { createGlobalStyle } from 'styled-components';
import { useWallet } from 'use-wallet';
import { Box, Button, Grid, Paper, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import TokenInput from '../../components/TokenInput';
import useTombFinance from '../../hooks/useTombFinance';
import useTokenBalance from '../../hooks/useTokenBalance';
import useMigrate from '../../hooks/useMigrate';
import useSwapFee from '../../hooks/useSwapFee';
import useOldToken from '../../hooks/useOldToken';
import useNewToken from '../../hooks/useNewToken';
import useNewRatio from '../../hooks/useNewRatio';
import useOldRatio from '../../hooks/useOldRatio';
import useSwapEnabled from '../../hooks/useSwapEnabled';
import useOldDeciaml from '../../hooks/useOldDecimal';
import useNewDeciaml from '../../hooks/useNewDecimal';
import useUserInfo from '../../hooks/useUserInfo';

import useApprove, { ApprovalState } from '../../hooks/useApprove';

import { getDisplayBalance } from '../../utils/formatBalance';
// import HomeImage from '../../assets/img/background.jpeg';
import NewTokenImg from '../../assets/img/tomb.png';
import OldTokenImg from '../../assets/img/old.png';
import HomeImage from '../../assets/img/back.jpg';
import BnbImage from '../../assets/img/bnb.png';
import { white, red1 } from '../../theme/colors';
import WalletProviderModal from '../../components/WalletProviderModal';

import "../../index.css"

const BackgroundImage = createGlobalStyle`
  body {
    background: url(${HomeImage}) no-repeat !important;
    // background-attachment: fixed;
  }
`;

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

const Mint = () => {

  const [tokenAmount, setTokenAmount] = useState();
  const [oldTokenAmount, setOldTokenAmount] = useState();
  const [color, setColor] = useState(white);
  const [isWalletProviderOpen, setWalletProviderOpen] = useState(false);
  const { balance, account } = useWallet();

  const tombFinance = useTombFinance();
  const newTokenBalance = useTokenBalance(tombFinance.NEW);
  const oldTokenBalance = useTokenBalance(tombFinance.OLD);
  
  // const oldRatio = useTokenBalance(tombFinance.OLD);
  // const newRatio = useTokenBalance(tombFinance.OLD);
  const { Migration } = tombFinance.contracts;
  const [approveStatus, approve] = useApprove(tombFinance.OLD, Migration.address); 
  const { onMigrate } = useMigrate();
  
  const swapFee = useSwapFee();
  const oldName = useOldToken();
  const newName = useNewToken();
  const newRatio = useNewRatio();
  const oldDecimal = useOldDeciaml();
  const newDecimal = useNewDeciaml();
  console.log('log->newDecimal', newDecimal)
  const oldRatio = useOldRatio();
  const swapEnabled = useSwapEnabled();
  // const totalMigrated = 0;
  const userinfo = useUserInfo();
  const allowedamount = useMemo(() => (userinfo ? String(userinfo.amount) : 0), [userinfo]);
  const wl = useMemo(() => (userinfo ? userinfo.iswl : false), [userinfo]);

  const handleWalletProviderOpen = () => {
    setWalletProviderOpen(true);
  };
  const handleWalletProviderClose = () => {
    setWalletProviderOpen(false);
  };
  
  const bnbBalance = balance;
  

  const handleChange = async (e) => {
    if (e.currentTarget.value === '' || e.currentTarget.value === 0) {
      setTokenAmount(e.currentTarget.value);
    }
    if (!isNumeric(e.currentTarget.value)){
      setTokenAmount(0);
      setOldTokenAmount(0)
      return;
    } 
    setTokenAmount(oldRatio / newRatio * e.currentTarget.value);
    setOldTokenAmount(e.currentTarget.value);

    if(e.currentTarget.value>(Number(oldTokenBalance)/ oldDeciamlPart)){
      setColor(red1)
    }
    else{
      setColor(white)
    }    
  };

  const handleSelectMax = async () => {
    setColor(white)
    setTokenAmount(new Intl.NumberFormat("en-US", {
        maximumFractionDigits: 10,
        minimumFractionDigits: 0,
    }).format(Number(getDisplayBalance(oldTokenBalance, oldDecimal ? oldDecimal.toString() : 18, 2) * oldRatio / newRatio)));
    setOldTokenAmount(new Intl.NumberFormat("en-US", {
      maximumFractionDigits: 10,
      minimumFractionDigits: 0,
  }).format(Number(getDisplayBalance(oldTokenBalance, oldDecimal ? oldDecimal.toString() : 18, 2) )));

  };
  const oldDeciamlPart = Math.pow(10, oldDecimal ? oldDecimal.toString() : 18);
  const newDeciamlPart = Math.pow(10, newDecimal ? newDecimal.toString() : 18);
return (
    <Page className="center">
      <BackgroundImage />
      <Grid container justify="center" alignItems="center" style={{ marginTop : '30px'}}>
        {swapEnabled ?
          <Alert  variant="filled" severity="success" style={{marginBottom: '50px'}}>
            Upgrade to WEB3
          </Alert>
          :
          wl ?
          <Alert  variant="filled" severity="success" style={{marginBottom: '50px'}}>
            Upgrade to WEB3
          </Alert>
          :
          <Alert  variant="filled" severity="warning" style={{marginBottom: '50px'}}>
            SWAP IS DISABLED!
          </Alert>
        }
      </Grid>
      <Grid container justify="center">
        <Grid item md={4} sm={12} container justify="center" alignItems="center" >
          <Box className='Boxes'>            
            <Grid item xs={12} sm={12}>
              <Paper style={{ borderRadius: 18 }}>
                <Box style={{backgroundColor:'transparent'}}>
                  <Grid className='boxes' item xs={12} sm={12} style={{ borderRadius: 15, margin: "10px auto" }}>
                    <Box style={{padding: '15px 15px 18px'}}>
                      <Grid container className='redeem-content'>
                        <Grid className='inputbox' item xs={12}>
                          <TokenInput
                            value={oldTokenAmount || ''}
                            onSelectMax={handleSelectMax}
                            onChange={handleChange}
                            max={getDisplayBalance(oldTokenBalance, Number(oldDecimal.toString()), 2)}
                            symbol={ oldName }
                            images={OldTokenImg}
                            disabled={false} 
                            style={{color:color}}
                          />
                        </Grid>
                        {!swapEnabled &&
                        <>
                          <Grid item xs={6} sm={6} className="content">
                              {/* <p>Swap Fee</p> */}
                              <p>Allowed Amount</p>
                          </Grid>
                          <Grid item xs={6} sm={6} className="content" style={{ textAlign: 'right'}}>
                            {/* <p>{swapFee} BNB</p> */}
                            <p>{new Intl.NumberFormat("en-US", {
                                      maximumFractionDigits: 6,
                                      minimumFractionDigits: 0,
                                  }).format(allowedamount/oldDeciamlPart)} { oldName }</p>
                          </Grid>
                        </>
                        }
                      </Grid>
                    </Box>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Box>
        </Grid>
        <Grid item md={4} sm={12} container justify="center" alignItems="center" sx={{ mb: 2}} className="bnb-img">
          <img src={BnbImage} style={{width: '80%', marginTop: '30px', marginBottom: '30px'}} alt="logo"></img>          
        </Grid>
        <Grid item md={4} sm={12} container justify="center" alignItems="center">
          <Box className='Boxes' style={{width: '100%'}}>            
            <Grid item xs={12} sm={12}>
              <Paper style={{ borderRadius: 18 }}>
                <Box style={{backgroundColor:'transparent'}}>
                  <Grid className='boxes' item xs={12} sm={12} style={{ borderRadius: 15, margin: "10px auto" }}>
                    <Box style={{padding: '15px 15px 18px'}}>
                      <Grid container className='redeem-content'>
                        <Grid className='inputbox' item xs={12}>
                          <TokenInput
                            value={tokenAmount || ''}
                            max={getDisplayBalance(newTokenBalance, Number(newDecimal.toString()), 2)}
                            symbol={ newName }
                            images={NewTokenImg}
                            disabled={true}
                            style={{color:color}}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Grid>
                </Box>
              </Paper>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Grid item xs={12} justifycontent="center" style={{ textAlign: 'center', marginTop: '50px' }} >
        { account ?
          approveStatus !== ApprovalState.APPROVED ?
          <Button
            disabled={
              approveStatus === ApprovalState.PENDING ||
              approveStatus === ApprovalState.UNKNOWN
            }
            onClick={approve}
            color="primary"
            variant="contained"
            className='wallectButton'
            style={{maxWidth : '400px', width: '50%', marginBottom : '30px' }}
          >
            {`Approve ${oldName }`}
          </Button>
        :
          <Button
            variant="contained"
            onClick={() => onMigrate(oldTokenAmount)}
            disabled={Number(oldTokenAmount) > Number(oldTokenBalance / oldDeciamlPart) || (!swapEnabled && Number(oldTokenAmount) > Number(allowedamount / oldDeciamlPart))  || Number(oldTokenBalance) <= 0 || Number(tokenAmount)===0 || !tokenAmount || swapFee > Number(bnbBalance) / 1e18 || (!wl && !swapEnabled)}
            color="primary"
            className='wallectButton'
            style={{maxWidth : '200px', width: '50%', marginBottom : '30px' }}
          >
            { Number(oldTokenAmount) > Number(oldTokenBalance / oldDeciamlPart) ? `Insufficient ${oldName} Balance` : (!swapEnabled && Number(oldTokenAmount) > Number(allowedamount / oldDeciamlPart)) ? "You Exceed Allowed Amount" : (swapFee > Number(bnbBalance) / 1e18) ? "Insufficient BNB Balance For Upgrade Fee" : (Number(tokenAmount)===0 || !tokenAmount) ? "Input Amount" :  (!wl && !swapEnabled) ? "Upgrade is not allowed" : "Upgrade"}
          </Button>
        :
          <Button
            variant="contained"
            onClick={handleWalletProviderOpen}
            color="primary"
            className='wallectButton'
          >
            Connect Wallet
          </Button> 
        }
          <WalletProviderModal
            open={isWalletProviderOpen}
            handleClose={handleWalletProviderClose}
          />
      </Grid>
    </Page>
  );
};

export default Mint;
