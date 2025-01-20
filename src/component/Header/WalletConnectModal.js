import { Box, Button, Divider, Popover, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ConnectButton, useWallet } from "@suiet/wallet-kit";
import "@suiet/wallet-kit/style.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const useWalletConnection = () => {
  const { connected, connecting, account, signMessage, signPersonalMessage, disconnect } =
    useWallet();

  const router = useRouter();
  const { rc } = router.query; // Access query parameters

  const [walletState, setWalletState] = useState({
    status: "disconnected", // 'disconnected' | 'connected_unsigned' | 'connected_signed'
    isConnecting: false,
    address: null,
    error: null,
  });

  const requestNonce = async (address) => {
    try {
      const response = await fetch("https://fantv-apis.fantiger.com/v1/airdrop/request-nonce", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(address),
      });
      const data = await response.json();
      return data.data.nonce;
    } catch (error) {
      throw new Error("Failed to get nonce");
    }
  };

  const verifySignature = async (address, signature) => {
    try {
      const response = await fetch("https://fantv-apis.fantiger.com/v1/airdrop/verify-signature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, signature }),
      });
      const data = await response.json();
      if (data.code === 200) return data.data;
      throw new Error("Verification failed");
    } catch (error) {
      throw new Error("Failed to verify signature");
    }
  };

  const handleDisconnect = () => {
    // Clear all stored data
    localStorage.removeItem("walletInfo");
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

    // Remove cookies
    document.cookie = "accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";

    // Reset wallet state
    setWalletState({
      status: "disconnected",
      isConnecting: false,
      address: null,
      error: null,
    });

    window.location.reload();
    // Disconnect wallet
    if (disconnect) {
      disconnect();
    }
  };

  // Check for existing session on mount
  useEffect(() => {
    const checkExistingSession = () => {
      const walletInfo = localStorage.getItem("walletInfo");
      const user = localStorage.getItem("user");
      const accessToken = localStorage.getItem("accessToken");

      if (walletInfo && user && accessToken) {
        const parsedWalletInfo = JSON.parse(walletInfo);
        setWalletState({
          status: "connected_signed",
          isConnecting: false,
          address: parsedWalletInfo.address,
          error: null,
        });
      }
    };

    checkExistingSession();
  }, []);

  // Handle wallet connection changes
  useEffect(() => {
    if (connected && account) {
      const walletInfo = localStorage.getItem("walletInfo");
      if (walletInfo) {
        // Already signed, just update state
        const parsedWalletInfo = JSON.parse(walletInfo);
        setWalletState({
          status: "connected_signed",
          isConnecting: false,
          address: parsedWalletInfo.address,
          error: null,
        });
      } else {
        // Connected but not signed
        setWalletState({
          status: "connected_unsigned",
          isConnecting: false,
          address: account.address,
          error: null,
        });
        handleSign();
      }
    } else if (!connected) {
      // Clear state if wallet disconnects
      setWalletState({
        status: "disconnected",
        isConnecting: false,
        address: null,
        error: null,
      });
    }
  }, [connected, account]);

  const logData = async (logDataObj) => {
    try {
      const response = await fetch("https://admin.artistfirst.in/v1/user/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logDataObj),
      });
      const data = await response.json();
    } catch (error) {
      throw new Error("Failed to get nonce");
    }
  };

  const handleSign = async () => {
    if (!account?.address) return;

    try {
      setWalletState((prev) => ({ ...prev, isConnecting: true, error: null }));

      let obj = { address: account.address };
      if (rc) {
        obj.referralCode = rc;
      }
      const nonce = await requestNonce(obj);
      // const message = `Sign this message to verify your wallet: ${nonce}`;
      // const message = `Welcome to FanTV Airdrop Program!: ${nonce}`;
      // const msgBytes = new TextEncoder().encode(message);
      // const signatureResponse = await signPersonalMessage({
      //   message: msgBytes,
      // });

      const message = `Sign this message to verify your wallet: ${nonce}`;
      // const message = `Welcome to FanTV Airdrop Program! Please sign this message to verify your wallet: ${nonce}`;
      const signatureResponse = await signMessage({
        message: message,
      });

      const verificationData = await verifySignature(account.address, signatureResponse.signature);

      if (verificationData) {
        // Store session data
        localStorage.setItem(
          "walletInfo",
          JSON.stringify({
            address: account.address,
            signature: signatureResponse,
          })
        );
        localStorage.setItem("user", JSON.stringify(verificationData.user));
        localStorage.setItem("accessToken", verificationData.tokens.access.token);
        localStorage.setItem("refreshToken", verificationData.tokens.refresh.token);

        // Set cookie with tokens (you might want to use a cookie library)
        document.cookie = `accessToken=${verificationData.tokens.access.token}; path=/;`;

        setWalletState({
          status: "connected_signed",
          isConnecting: false,
          address: account.address,
          error: null,
        });
        window.location.reload();
      }
    } catch (error) {
      setWalletState((prev) => ({
        ...prev,
        isConnecting: false,
        error: error.message,
      }));
      let obj = {
        type: "sui-wallet-connect",
        log: {
          suiWalletException: error?.message || error,
        },
      };
      logData(obj);
    }
  };

  return {
    walletState,
    handleSign,
    handleDisconnect,
    isConnecting: connecting,
    connected,
  };
};

// Styled components remain the same
const WalletOption = styled(Button)(({ theme }) => ({
  width: "100%",
  justifyContent: "flex-start",
  padding: "12px 16px",
  borderRadius: "8px",
  textTransform: "none",
  color: "#000",
  fontFamily: "Nohemi",
  "&:hover": {
    backgroundColor: "rgba(0, 0, 0, 0.04)",
  },
  "& img": {
    width: "24px",
    height: "24px",
    marginRight: "12px",
  },
}));

const PointsBadge = styled(Box)(({ theme }) => ({
  backgroundColor: "#6366f1",
  color: "white",
  padding: "2px 8px",
  borderRadius: "12px",
  fontSize: "12px",
  marginLeft: "auto",
  fontFamily: "Nohemi",
}));

const DisconnectButton = styled(Button)(({ theme }) => ({
  width: "100%",
  justifyContent: "center",
  padding: "8px 16px",
  marginTop: "8px",
  borderRadius: "8px",
  textTransform: "none",
  color: "#EF4444",
  fontFamily: "Nohemi",
  border: "1px solid #EF4444",
  "&:hover": {
    backgroundColor: "rgba(239, 68, 68, 0.04)",
  },
}));

const WalletConnectModal = ({ anchorEl, onClose }) => {
  const { walletState, handleSign, handleDisconnect, isConnecting } = useWalletConnection();
  const open = Boolean(anchorEl);

  const logData = async (logDataObj) => {
    try {
      const response = await fetch("https://admin.artistfirst.in/v1/user/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logDataObj),
      });
      const data = await response.json();
    } catch (error) {
      throw new Error("Failed to get nonce");
    }
  };

  const truncateAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  useEffect(() => {
    if (walletState?.error) {
      let obj = {
        type: "sui-wallet-connect",
        log: {
          suiWalletError: walletState,
        },
      };
      logData(obj);
    } else if (walletState?.status == "connected_signed") {
      let obj = {
        type: "sui-wallet-connect",
        log: {
          suiWalletSuccess: walletState,
        },
      };
      logData(obj);
    }
  }, [walletState]);

  const renderWalletContent = () => {
    switch (walletState.status) {
      case "disconnected":
        return (
          <>
            <ConnectButton
              onConnectError={(error) => {
                let obj = {
                  type: "sui-wallet-connect",
                  log: {
                    suiWalletConnectError: error?.details,
                  },
                };
                logData(obj);
              }}
            >
              {({ connecting }) => (
                <WalletOption fullWidth>
                  <img src="/images/sui.svg" alt="Sui Wallet" />
                  <span style={{ flexGrow: 1, textAlign: "left" }}>
                    {connecting ? "Connecting..." : "Connect Sui Wallet"}
                  </span>
                  <PointsBadge>1.5x Points</PointsBadge>
                </WalletOption>
              )}
              Connect Sui Wallet
            </ConnectButton>
          </>
        );

      case "connected_unsigned":
        return (
          <WalletOption fullWidth onClick={handleSign} disabled={walletState.isConnecting}>
            <img src="/images/sui.svg" alt="Sui Wallet" />
            <Box sx={{ flexGrow: 1, textAlign: "left" }}>
              <Typography sx={{ fontWeight: "medium" }}>
                {walletState.isConnecting ? "Signing..." : "Sign Message"}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                {truncateAddress(walletState.address)}
              </Typography>
            </Box>
            <PointsBadge>Sign</PointsBadge>
          </WalletOption>
        );

      case "connected_signed":
        return (
          <>
            <WalletOption
              fullWidth
              sx={{
                backgroundColor: "rgba(99, 102, 241, 0.1)",
                "&:hover": {
                  backgroundColor: "rgba(99, 102, 241, 0.2)",
                },
              }}
            >
              <img src="/images/sui.svg" alt="Sui Wallet" />
              <Box sx={{ flexGrow: 1, textAlign: "left" }}>
                <Typography sx={{ fontWeight: "medium" }}>Sui Wallet</Typography>
                <Typography variant="caption" sx={{ color: "text.secondary" }}>
                  {truncateAddress(walletState.address)}
                </Typography>
              </Box>
              <PointsBadge>Connected</PointsBadge>
            </WalletOption>
            <Divider sx={{ my: 2 }} />
            <DisconnectButton onClick={handleDisconnect}>Disconnect Wallet</DisconnectButton>
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
        vertical: "top",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      PaperProps={{
        sx: {
          width: "320px",
          mt: 1,
          // minHeight: "200px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          borderRadius: "12px",
          background: "linear-gradient(rgba(255,255,255,1) 0%, rgba(255,255,255,0.4) 100%)",
          backdropFilter: "blur(8px)",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Box display="flex" alignItems="center" mb={2}>
          <Typography
            variant="h6"
            sx={{
              fontWeight: "bold",
              color: "#000",
              fontFamily: "Bricolage Grotesque",
            }}
          >
            {walletState.status === "disconnected"
              ? "CONNECT WALLET"
              : walletState.status === "connected_unsigned"
              ? "SIGN MESSAGE"
              : "CONNECTED WALLET"}
          </Typography>
        </Box>

        <Box>{renderWalletContent()}</Box>

        {walletState.error && (
          <Typography
            color="error"
            variant="caption"
            sx={{ display: "block", mt: 1, textAlign: "center" }}
          >
            {walletState.error}
          </Typography>
        )}
      </Box>
    </Popover>
  );
};

export default WalletConnectModal;
