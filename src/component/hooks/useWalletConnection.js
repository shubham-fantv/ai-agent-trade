import { useCurrentAccount, useDisconnectWallet, useSignPersonalMessage } from "@mysten/dapp-kit";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FANTV_API_URL } from "@/src/constant/constants";
const useWalletConnection = () => {
  const account = useCurrentAccount();
  const { mutate: signPersonalMessage } = useSignPersonalMessage();
  const { mutate: disconnect } = useDisconnectWallet();

  const router = useRouter();
  const { rc } = router.query;

  const [walletState, setWalletState] = useState({
    status: "disconnected",
    isConnecting: false,
    address: null,
    error: null,
  });

  const requestNonce = async (address) => {
    try {
      const response = await fetch(`${FANTV_API_URL}/v1/auth/request-nonce`, {
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
      const signatureBase64 = btoa(String.fromCharCode(...signature));

      const response = await fetch(`${FANTV_API_URL}/v1/auth/verify-signature`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          signature: signatureBase64,
        }),
      });
      const data = await response.json();
      if (data.code === 200) return data.data;
      throw new Error("Verification failed");
    } catch (error) {
      throw new Error("Failed to verify signature");
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem("walletInfo");
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    document.cookie = "accessToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";

    setWalletState({
      status: "disconnected",
      isConnecting: false,
      address: null,
      error: null,
    });

    if (disconnect) {
      disconnect();
    }
    window.location.reload();
  };

  useEffect(() => {
    const checkExistingSession = () => {
      const walletInfo = localStorage.getItem("walletInfo");
      const user = localStorage.getItem("user");
      const accessToken = localStorage.getItem("accessToken");

      if (walletInfo && user && accessToken) {
        const parsedWalletInfo = JSON.parse(walletInfo);
        setWalletState({
          status: "connected",
          isConnecting: false,
          address: parsedWalletInfo.address,
          error: null,
        });
      }
    };

    checkExistingSession();
  }, []);

  const logData = async (logDataObj) => {
    try {
      const response = await fetch("https://admin.artistfirst.in/v1/user/log", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(logDataObj),
      });
      await response.json();
    } catch (error) {
      throw new Error("Failed to log data");
    }
  };

  useEffect(() => {
    if (account) {
      setWalletState({
        status: "connected",
        isConnecting: false,
        address: account.address,
        error: null,
      });
      handleSign();
    }
  }, [account]);

  const handleSign = async () => {
    if (!account?.address) return;

    try {
      setWalletState((prev) => ({ ...prev, isConnecting: true, error: null }));

      let obj = { address: account.address };
      if (rc) {
        obj.referralCode = rc;
      }
      const nonce = await requestNonce(obj);
      const verificationData = await verifySignature(account.address, "dummy signature");

      if (verificationData) {
        localStorage.setItem(
          "walletInfo",
          JSON.stringify({
            address: account.address,
            signature: "dummy signature",
          })
        );
        localStorage.setItem("user", JSON.stringify(verificationData.user));
        localStorage.setItem("accessToken", verificationData.tokens.access.token);
        localStorage.setItem("refreshToken", verificationData.tokens.refresh.token);
        document.cookie = `accessToken=${verificationData.tokens.access.token}; path=/;`;

        setWalletState({
          status: "connected",
          isConnecting: false,
          address: account.address,
          error: null,
        });
        // window.location.reload();
      }
    } catch (error) {
      console.error("Signing error:", error);
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
    isConnecting: false,
    connected: !!account,
  };
};

export default useWalletConnection;
