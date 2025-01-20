import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Instagram,
  Twitter,
  Send,
  MessageCircle,
} from "lucide-react";
import { useState } from "react";
import { fontFamily } from "@mui/system";

export default function AgentDetails() {
  const [isBuyMode, setIsBuyMode] = useState(true);
  const [amount, setAmount] = useState(1.05);

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white pt-24">
      <Head>
        <title>Mona AI - Agent Details</title>
        <meta name="description" content="Mona AI Agent Details" />
      </Head>

      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 mb-6">
          <Link href="/" className="hover:opacity-80">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1
            className="text-xl font-bold"
            style={{ fontFamily: "BricolageGrotesque" }}
          >
            AGENT DETAILS
          </h1>
        </div>

        {/* Agent Info Card */}
        <div className="bg-[#222222] rounded-xl p-6 mb-6">
          <div className="flex items-start justify-between ">
            <div className="flex items-start gap-4">
              <div className="relative">
                <img
                  src="/images/mona.png"
                  alt="Mona AI"
                  className="rounded-xl w-[248px] h-[248px]"
                />
              </div>
              <div className="rounded-[24px] border-[2px] border-[#FFFFFF]/15 w-[1024px] p-6 h-[248px]">
                <div className="flex justify-between items-center gap-2 mb-1">
                  <div className="flex items-center gap-2 items-center mb-1">
                    <h2 className="text-xl font-bold">Mona AI</h2>
                    <span className="text-xs px-2 py-0.5 rounded bg-[#333333] text-gray-400">
                      SMONA
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <button className="p-2 rounded-full bg-[#333333] hover:bg-[#444444] transition-colors">
                      <Instagram className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-full bg-[#333333] hover:bg-[#444444] transition-colors">
                      <Twitter className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-full bg-[#333333] hover:bg-[#444444] transition-colors">
                      <Send className="w-4 h-4" />
                    </button>
                    <button className="p-2 rounded-full bg-[#333333] hover:bg-[#444444] transition-colors">
                      <MessageCircle className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-1 mb-3">
                  <div className="w-[195px] h-[32px] px-2 text-[14px] text-[#CCFF00] bg-[#353B1A] flex justify-between items-center gap-1 border-[2px] border-[#CCFF00]/30 rounded-[8px] m-[1px]">
                    0xdctw...f4t192
                    <svg
                      className="cursor-pointer"
                      width="14"
                      height="15"
                      viewBox="0 0 12 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M5.85986 11.875H3.60986C1.53486 11.875 0.609863 10.95 0.609863 8.875V6.625C0.609863 4.55 1.53486 3.625 3.60986 3.625H5.85986C7.93486 3.625 8.85986 4.55 8.85986 6.625V8.875C8.85986 10.95 7.93486 11.875 5.85986 11.875ZM3.60986 4.375C1.94986 4.375 1.35986 4.965 1.35986 6.625V8.875C1.35986 10.535 1.94986 11.125 3.60986 11.125H5.85986C7.51986 11.125 8.10986 10.535 8.10986 8.875V6.625C8.10986 4.965 7.51986 4.375 5.85986 4.375H3.60986Z"
                        fill="white"
                      />
                      <path
                        d="M9.05986 7.375H8.48486C8.27986 7.375 8.10986 7.205 8.10986 7V6.625C8.10986 4.965 7.51986 4.375 5.85986 4.375H5.48486C5.27986 4.375 5.10986 4.205 5.10986 4V3.425C5.10986 1.835 5.81986 1.125 7.40986 1.125H9.05986C10.6499 1.125 11.3599 1.835 11.3599 3.425V5.075C11.3599 6.665 10.6499 7.375 9.05986 7.375ZM8.85986 6.625H9.05986C10.2349 6.625 10.6099 6.25 10.6099 5.075V3.425C10.6099 2.25 10.2349 1.875 9.05986 1.875H7.40986C6.23486 1.875 5.85986 2.25 5.85986 3.425V3.625C7.93486 3.625 8.85986 4.55 8.85986 6.625Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                  <span className="h-[32px] w-[125px] text-[12px] rounded-[12px] border-[1px] border-[#FFFFFF]/30 flex justify-center items-center">
                    Productivity
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-14">
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Market Cap</div>
                    <div className="text-2xl font-bold">$513K</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">Price</div>
                    <div className="text-2xl font-bold">0.023$</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 mb-1">24 hr vol.</div>
                    <div className="text-2xl font-bold">$3,303,895.31</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Graph Section */}
          <div className="col-span-2">
            <div className="bg-[#222222] border-[2px] border-[#FFFFFF]/15 rounded-xl p-6 h-[300px] mb-6">
              <h3 className="text-xl font-bold mb-4">Graph</h3>
              <div className="text-gray-500 h-full flex items-center justify-center"></div>
            </div>

            {/* What does it do Section */}
            <div className="bg-[#222222] border-[2px] border-[#FFFFFF]/15 rounded-xl p-6">
              {/* Tabs */}
              <div className="flex gap-4 mb-4 border-b border-gray-700">
                <button className="py-2 px-4 bg-transparent border-b-2 border-transparent text-gray-400 hover:text-white hover:border-white">
                  Trades
                </button>
                <button className="py-2 px-4 border-b-2 border-white text-white">
                  What does it do
                </button>
              </div>
              <div className="bg-[#1E1E1E] flex gap-2 rounded-[24px] p-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="relative">
                    <img
                      src="/images/mona.png"
                      alt="Mona AI"
                      className="rounded-[24px] w-[116px] h-[113px]"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-6">
                <h4 className="font-bold mb-2">Summary</h4>
                <p className="text-gray-400 text-sm mb-4">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod.
                </p>

                <h4 className="font-bold mb-2">Highlights</h4>
                <ul className="text-gray-400 text-sm list-disc list-inside">
                  <li>Twitter Agent</li>
                  <li>discord</li>
                  <li>stuff</li>
                  <li>stff</li>
                  <li>sdfdsf</li>
                  <li>stff</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Buy/Sell Section */}
          <div className="space-y-6">
            <div className="bg-[#222222] border-[2px] border-[#FFFFFF]/15 rounded-xl p-6">
              <div className="flex rounded-full bg-[#333333] p-1.5 mb-6">
                <button
                  className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all
        ${
          isBuyMode ? "bg-white text-black" : "text-gray-400 hover:text-white"
        }`}
                  onClick={() => setIsBuyMode(true)}
                >
                  Buy
                </button>
                <button
                  className={`flex-1 py-2.5 rounded-full text-sm font-medium transition-all
        ${
          !isBuyMode ? "bg-white text-black" : "text-gray-400 hover:text-white"
        }`}
                  onClick={() => setIsBuyMode(false)}
                >
                  Sell
                </button>
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-sm mb-3">
                  <div className="flex items-center gap-1">
                    <span>Amount</span>
                    <span className="text-gray-400">Slippage: 12%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-2 py-1 rounded bg-[#2A2A2A] text-xs">
                      0
                    </button>
                    <button className="px-2 py-1 rounded bg-[#2A2A2A] text-xs">
                      Max
                    </button>
                    <button className="px-2 py-1 rounded bg-[#2A2A2A] text-xs">
                      50%
                    </button>
                  </div>
                </div>
                <div className="relative">
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-[#2A2A2A] rounded-xl p-4 mb-2"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <img
                      src="/images/sui.svg"
                      alt="SUI"
                      className="w-[16px] h-[16px]"
                    />
                    <span className="text-sm">SUI</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-sm mb-3">You Receive</div>
                <div className="relative">
                  <input
                    type="text"
                    value="1,350,889"
                    readOnly
                    className="w-full bg-[#2A2A2A] rounded-xl p-4"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <img
                      src="/images/sui.svg"
                      alt="SUI"
                      className="w-[16px] h-[16px]"
                    />
                    <span className="text-sm">MONA</span>
                  </div>
                </div>
              </div>

              <button className="w-full py-4 rounded-full bg-[#CCFF00] text-black hover:bg-[#8B9B3E] transition-colors font-medium flex items-center justify-center gap-2">
                Place Trade
              </button>
            </div>

            {/* Bonding Curve */}
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Bonding Curve</h3>
              <div className="h-1 bg-[#333333] rounded-full overflow-hidden mb-4">
                <div className="h-full w-[100%] bg-gradient-to-r from-[#CCFF00] to-[#CCFF00]/0"></div>
              </div>
              <div className="text-sm text-gray-400">
                <p className="mb-2">
                  When the market cap reaches $7,500 $AI all the liquidity from
                  the bonding curve will be deposited into Cellar and burned,
                  progression increases as the price goes up.
                </p>
                <p>
                  there is a 0 tokens still available for sale in the bonding
                  curve and there is 5,000 $AI in the bonding curve
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
