import { FANTV_API_URL } from "@/src/constant/constants";
import fetcher from "@/src/dataProvider";
import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { ArrowLeft, Instagram, Send, Twitter } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import React, { useState } from "react";
import Graph from "../../src/component/Graph/Graph";
import TradeComponent from "../../src/component/TradeComponent";
import TradeTable from "../../src/component/TradeTable/TradeTable";
import { formatWalletAddress } from "../../src/utils/common";
import { agents } from "../trade";
import CreateAgentModal from "../../src/component/CreateAgentModal";
import { useMediaQuery } from "@mui/system";

const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: "#f5f5f9",
    background: "linear-gradient(180deg, rgba(69, 69, 69, 0.4) 0%, rgba(69, 69, 69, 0.4) 100%)",
    border: "1px solid #6D6D6D",
    borderRadius: "20px",
    boxShadow: "0px 4px 4px 0px #00000073",
    backdropFilter: "blur(34px)",
    padding: "20px",
  },
  [`& .${tooltipClasses.arrow}`]: {
    fontSize: "40px",
    "&::before": {
      border: "1px solid #6D6D6D",
    },
  },
}));

const getCategoryByTag = (tag) => {
  const agent = agents.find((agent) => agent.tag === tag);
  return agent ? agent.category : "Category not found";
};

const TabButton = ({ isActive, onClick, children }) => {
  return (
    <button
      className={`
      px-4 py-2 
      text-white
      transition-all
      border-b-2
      ${isActive ? "border-white font-medium" : "border-transparent hover:border-white/50"}
    `}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default function AgentDetails({ agentDetail, agentId }) {
  const [copied, setCopied] = useState(false);

  const isMobile = useMediaQuery("(max-width:768px)");

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const tabs = [
    {
      id: 0,
      label: "Trades",
      component: (
        <div className=" bg-[#222222]">
          <div className="mt-6 max-w-7xl">
            <h4 className="mb-2 font-nohemi font-bold">Recent Trades</h4>
            <TradeTable agentDetail={agentDetail} />
          </div>
        </div>
      ),
    },
    {
      id: 1,
      label: "Summary",
      component: (
        <div className="mt-6">
          <h4 className="mb-2 font-bold">Summary</h4>
          <p className="mb-4 text-sm text-gray-400">{agentDetail?.description}</p>

          {agentDetail?.highLights && <h4 className="mb-2 font-bold">Highlights</h4>}
          {agentDetail?.highLights &&
            agentDetail?.highLights?.map((item) => {
              return (
                <ul className="text-sm text-gray-400 list-disc list-inside">
                  <li>{"item"}</li>
                </ul>
              );
            })}
        </div>
      ),
    },
  ];

  const [tab, setTab] = useState(tabs[0]);
  const [graphData, setGraphData] = useState(null);

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-white pt-24 px-4 sm:px-6">
      <Head>
        <title>{agentDetail?.name} AI - Agent Details</title>
        <meta name="description" content="Mona AI Agent Details" />
      </Head>

      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-2 my-5">
          <Link href="/" className="hover:opacity-80">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <h1
            className="text-xl font-bold text-center sm:text-left"
            style={{ fontFamily: "BricolageGrotesque" }}
          >
            AGENT DETAILS
          </h1>
        </div>

        {/* Agent Info Card */}
        <div className={`${isMobile ? "p-0" : "p-6"} bg-[#222222] rounded-xl  mb-6`}>
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
            {!isMobile && (
              <div className="relative sm:w-[248px] w-full mx-auto sm:mx-0 sm:flex-grow">
                <HtmlTooltip
                  placement={"right"}
                  arrow={true}
                  title={
                    <div>
                      <Typography>{agentDetail?.ticker}</Typography>
                      {agentDetail?.description}
                    </div>
                  }
                >
                  <img
                    src={agentDetail.profilePic}
                    alt="Agent_Profile"
                    className="rounded-xl w-full h-auto sm:w-[248px] sm:h-[248px]"
                  />
                </HtmlTooltip>
              </div>
            )}
            <div className="rounded-[24px] border-[2px] border-[#FFFFFF]/15 w-full w-full h-auto  sm:h-[246px]  sm:w-[1024px] p-6 sm:flex-grow">
              <div className="flex flex-col justify-between gap-2 mb-3 sm:flex-row">
                {isMobile ? (
                  <div className="flex">
                    <div style={{ height: "80px !important", width: "80px !important" }}>
                      <img
                        src={agentDetail.profilePic}
                        alt="Agent_Profile"
                        style={{ height: "80px !important", width: "80px !important" }}
                        className="rounded-xl w-full h-auto w-[80px] h-[80px]"
                      />
                    </div>

                    <div className="ml-2">
                      <h2 className="text-xl font-bold">
                        {agentDetail?.name}{" "}
                        <span className="text-xs  py-0.5 rounded  text-gray-400">
                          ({agentDetail?.ticker})
                        </span>
                      </h2>

                      <div className="flex gap-3 mt-1">
                        {agentDetail?.instagram && (
                          <a
                            href={agentDetail?.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-[#333333] hover:bg-[#444444] transition-colors"
                          >
                            <Instagram className="w-4 h-4" />
                          </a>
                        )}
                        {agentDetail?.twitter && (
                          <a
                            href={agentDetail?.twitter}
                            className="p-2 rounded-full bg-[#333333] hover:bg-[#444444] transition-colors"
                          >
                            <Twitter className="w-4 h-4" />
                          </a>
                        )}
                        {agentDetail?.discord && (
                          <a
                            href={agentDetail?.discord}
                            className="p-2 rounded-full bg-[#333333] hover:bg-[#444444] transition-colors"
                          >
                            <Send className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold">{agentDetail?.name}</h2>
                    <span className="text-xs px-2 py-0.5 rounded bg-[#333333] text-gray-400">
                      {agentDetail?.ticker}
                    </span>
                  </div>
                )}
                {!isMobile && (
                  <div className="flex gap-3">
                    {agentDetail?.instagram && (
                      <a
                        href={agentDetail?.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-[#333333] hover:bg-[#444444] transition-colors"
                      >
                        <Instagram className="w-4 h-4" />
                      </a>
                    )}
                    {agentDetail?.twitter && (
                      <a
                        href={agentDetail?.twitter}
                        className="p-2 rounded-full bg-[#333333] hover:bg-[#444444] transition-colors"
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {agentDetail?.discord && (
                      <a
                        href={agentDetail?.discord}
                        className="p-2 rounded-full bg-[#333333] hover:bg-[#444444] transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-1 mb-3">
                <div className="w-full sm:w-[auto] h-[32px] px-2 text-[14px] text-[#CCFF00] bg-[#353B1A] flex justify-between items-center gap-1 border-[2px] border-[#CCFF00]/30 rounded-[8px] m-[1px]">
                  {formatWalletAddress(agentDetail?.tickerId)}
                  {copied ? (
                    <span className="text-xs">Copied!</span>
                  ) : (
                    <svg
                      className="cursor-pointer"
                      width="14"
                      height="15"
                      viewBox="0 0 12 13"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      onClick={() => copyToClipboard(agentDetail?.tickerId)}
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
                  )}
                </div>
                <span className="h-[32px] w-full sm:w-[125px] text-[12px] rounded-[12px] border-[1px] border-[#FFFFFF]/30 flex justify-center items-center">
                  {agentDetail?.category}
                </span>
              </div>

              {isMobile ? (
                <div className="grid grid-cols-3 gap-4 mt-6 ">
                  <div>
                    <div className="mb-1 text-sm text-gray-400">
                      Market Cap
                      <br /> ($MAN)
                    </div>
                    <div className="text-sm font-bold">{agentDetail?.marketCap}</div>
                  </div>
                  <div>
                    <div className="mb-1 text-sm text-gray-400">
                      Price <br /> ($MAN)
                    </div>
                    <div className="text-sm font-bold"> {agentDetail?.price || "0.0$"} </div>
                  </div>
                  <div>
                    <div className="mb-1 text-sm text-gray-400">
                      24 hr vol <br /> ($MAN)
                    </div>
                    <div className="text-sm font-bold">{agentDetail.volume24}</div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 mt-6 sm:grid-cols-3">
                  <div>
                    <div className="mb-1 text-sm text-gray-400">Market Cap ($MAN)</div>
                    <div className="text-sm font-bold">{agentDetail?.marketCap}</div>
                  </div>
                  <div>
                    <div className="mb-1 text-sm text-gray-400">Price ($MAN)</div>
                    <div className="text-sm font-bold"> {agentDetail?.price || "0.0$"} </div>
                  </div>
                  <div>
                    <div className="mb-1 text-sm text-gray-400">24 hr vol ($MAN)</div>
                    <div className="text-sm font-bold">{agentDetail.volume24}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={`${isMobile ? "gap-0" : "gap-6"} grid grid-cols-1 gap-6 sm:grid-cols-3`}>
          <div className="col-span-2">
            <Graph agentDetail={agentDetail} setGraphData={setGraphData} />
            {isMobile ? (
              <TradeComponent agentDetail={agentDetail} graphData={graphData} />
            ) : (
              <div className="bg-[#222222] border-[2px] border-[#FFFFFF]/15 rounded-xl p-6">
                <div className="flex space-x-4 border-b border-white/10">
                  <TabButton isActive={tab.label === tabs[0].label} onClick={() => setTab(tabs[0])}>
                    Trades
                  </TabButton>
                  <TabButton isActive={tab.label === tabs[1].label} onClick={() => setTab(tabs[1])}>
                    What does it do
                  </TabButton>
                </div>
                {agentDetail?.aiAgents && (
                  <div className="bg-[#1E1E1E] flex gap-2 rounded-[24px] p-2 w-full overflow-x-scroll">
                    {agentDetail?.aiAgents.map((agent, index) => (
                      <div key={i} className="relative shrink-0">
                        <img
                          src={agentDetail?.profilePic}
                          alt="Mona AI"
                          className="rounded-[24px] w-[116px] h-[113px]"
                        />
                      </div>
                    ))}
                  </div>
                )}
                {tab.component}
              </div>
            )}
          </div>

          {isMobile ? (
            <div className="bg-[#222222] border-[2px] border-[#FFFFFF]/15 gap-0 rounded-xl p-6">
              <div className="flex space-x-4 border-b border-white/10">
                <TabButton isActive={tab.label === tabs[0].label} onClick={() => setTab(tabs[0])}>
                  Trades
                </TabButton>
                <TabButton isActive={tab.label === tabs[1].label} onClick={() => setTab(tabs[1])}>
                  What does it do
                </TabButton>
              </div>
              {agentDetail?.aiAgents && (
                <div className="bg-[#1E1E1E] flex gap-2 rounded-[24px] p-2 w-full overflow-x-scroll">
                  {agentDetail?.aiAgents.map((agent, index) => (
                    <div key={i} className="relative shrink-0">
                      <img
                        src={agentDetail?.profilePic}
                        alt="Mona AI"
                        className="rounded-[24px] w-[116px] h-[113px]"
                      />
                    </div>
                  ))}
                </div>
              )}
              {tab.component}
            </div>
          ) : (
            <TradeComponent agentDetail={agentDetail} graphData={graphData} />
          )}
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const getAgentUrl = `${FANTV_API_URL}/v1/agent/${query.agentId}`;

  try {
    const response = await fetcher.get(getAgentUrl);
    const agentData = response?.data;

    return {
      props: {
        agentDetail: agentData,
        agentId: query.agentId || null,
      },
    };
  } catch (error) {
    console.error("Error fetching document types:", error);

    return {
      props: {
        agentDetail: [],
        agentId: query.agentId || null,
        error: "Failed to fetch document types.",
      },
    };
  }
}
