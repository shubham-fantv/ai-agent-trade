import { Box, Button, Divider, Popover, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  ConnectButton,
  useCurrentAccount,
  useDisconnectWallet,
  useSignPersonalMessage,
} from '@mysten/dapp-kit';
import useWalletConnection from '../hooks/useWalletConnection';

const WalletOption = styled(Button)(({ theme }) => ({
  width: '100%',
  justifyContent: 'flex-start',
  padding: '12px 16px',
  borderRadius: '8px',
  textTransform: 'none',
  color: '#000',
  fontFamily: 'Nohemi',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 0.04)',
  },
  '& img': {
    width: '24px',
    height: '24px',
    marginRight: '12px',
  },
}));

const PointsBadge = styled(Box)(({ theme }) => ({
  backgroundColor: '#6366f1',
  color: 'white',
  padding: '2px 8px',
  borderRadius: '12px',
  fontSize: '12px',
  marginLeft: 'auto',
  fontFamily: 'Nohemi',
}));

const DisconnectButton = styled(Button)(({ theme }) => ({
  width: '100%',
  justifyContent: 'center',
  padding: '8px 16px',
  marginTop: '8px',
  borderRadius: '8px',
  textTransform: 'none',
  color: '#EF4444',
  fontFamily: 'Nohemi',
  border: '1px solid #EF4444',
  '&:hover': {
    backgroundColor: 'rgba(239, 68, 68, 0.04)',
  },
}));

const WalletConnectModal = ({ anchorEl, onClose }) => {
  const { walletState, handleDisconnect } = useWalletConnection();

  const open = Boolean(anchorEl);

  const logData = async (logDataObj) => {
    try {
      const response = await fetch('https://admin.artistfirst.in/v1/user/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logDataObj),
      });
      await response.json();
    } catch (error) {
      throw new Error('Failed to get nonce');
    }
  };

  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  useEffect(() => {
    if (walletState?.error) {
      let obj = {
        type: 'sui-wallet-connect',
        log: {
          suiWalletError: walletState,
        },
      };
      logData(obj);
    } else if (walletState?.status == 'connected_signed') {
      let obj = {
        type: 'sui-wallet-connect',
        log: {
          suiWalletSuccess: walletState,
        },
      };
      logData(obj);
    }
  }, [walletState]);

  const renderWalletContent = () => {
    switch (walletState.status) {
      case 'disconnected':
        return (
          <ConnectButton>
            {({ connecting }) => (
              <WalletOption fullWidth>
                <img src='/images/sui.svg' alt='Sui Wallet' />
                <span style={{ flexGrow: 1, textAlign: 'left' }}>
                  {connecting ? 'Connecting...' : 'Connect Sui Wallet'}
                </span>
                <PointsBadge>1.5x Points</PointsBadge>
              </WalletOption>
            )}
          </ConnectButton>
        );
      case 'connected':
        return (
          <>
            <WalletOption
              fullWidth
              sx={{
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(99, 102, 241, 0.2)',
                },
              }}
            >
              <img src='/images/sui.svg' alt='Sui Wallet' />
              <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
                <Typography sx={{ fontWeight: 'medium' }}>
                  Sui Wallet
                </Typography>
                <Typography variant='caption' sx={{ color: 'text.secondary' }}>
                  {truncateAddress(walletState.address)}
                </Typography>
              </Box>
              <PointsBadge>Connected</PointsBadge>
            </WalletOption>
            <Divider sx={{ my: 2 }} />
            <DisconnectButton onClick={handleDisconnect}>
              Disconnect Wallet
            </DisconnectButton>
          </>
        );
    }
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      PaperProps={{
        sx: {
          width: '320px',
          mt: 1,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          borderRadius: '12px',
          background:
            'linear-gradient(rgba(255,255,255,1) 0%, rgba(255,255,255,0.4) 100%)',
          backdropFilter: 'blur(8px)',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box display='flex' alignItems='center' mb={2}>
          <Typography
            variant='h6'
            sx={{
              fontWeight: 'bold',
              color: '#000',
              fontFamily: 'Bricolage Grotesque',
            }}
          >
            {walletState.status === 'disconnected'
              ? 'CONNECT WALLET'
              : walletState.status === 'connected_unsigned'
              ? 'SIGN MESSAGE'
              : 'CONNECTED WALLET'}
          </Typography>
        </Box>

        <Box>{renderWalletContent()}</Box>

        {walletState.error && (
          <Typography
            color='error'
            variant='caption'
            sx={{ display: 'block', mt: 1, textAlign: 'center' }}
          >
            {walletState.error}
          </Typography>
        )}
      </Box>
    </Popover>
  );
};

export default WalletConnectModal;
