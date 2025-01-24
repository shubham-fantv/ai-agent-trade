import { DefaultSeo } from "next-seo";

const AppSeo = () => {
  return (
    <>
      <DefaultSeo
        title="Agent Nation"
        description="Ultimate AI Agent Marketplace on SUI"
        additionalMetaTags={[
          {
            property: "al:android:url",
            content: "fantiger://",
          },
          {
            property: "al:android:app_name",
            content: "FanTV",
          },
          {
            property: "al:android:package",
            content: "com.fantv",
          },
        ]}
      />
    </>
  );
};

export default AppSeo;
