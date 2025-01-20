import {
  BreadcrumbJsonLd,
  DefaultSeo,
  SiteLinksSearchBoxJsonLd,
  SocialProfileJsonLd,
} from "next-seo";

const AppSeo = () => {
  return (
    <>
      <DefaultSeo
        title="Airdrop | FanTV: AI Content Creation Platform To Create Videos You Love"
        description="Discover FanTV, the platform that makes content creation easy and rewarding with tools for generation, video editing, platform perks & a community that supports you."
        canonical="https://www.fantv.in"
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

      <BreadcrumbJsonLd
        itemListElements={[
          {
            position: 1,
            name: "Invest in Music",
            item: "https://fantv.in/invest?type=trade",
          },
          {
            position: 2,
            name: "FanTv Music Cards",
            item: "https://fantv.in/invest?type=music-card",
          },
          {
            position: 3,
            name: "Top 50 Hindi",
            item: "https://fantv.in/watch/maan-meri-jaan-official-music-video-champagne-1c29e3?isPlaylist=true",
          },
          {
            position: 4,
            name: "Top 50 Panjabi",
            item: "https://fantv.in/watch/take-it-easy-official-video-karan-aujla-ikky--b5780e?isPlaylist=true",
          },
          {
            position: 5,
            name: "Top 50 Bhojpuri",
            item: "https://fantv.in/watch/-pawan-singh-pudina-ae-haseena-le-lo-pudina-f-6a9817?isPlaylist=true",
          },
          {
            position: 6,
            name: "Top 50 Haryanvi",
            item: "https://fantv.in/watch/gypsy-balam-thanedar-dinesh-golan-pranjal-dah-c323ad?isPlaylist=true",
          },
          {
            position: 7,
            name: "Top 50 Rap",
            item: "https://fantv.in/watch/mitraz-akhiyaan-official-music-video-49fc6e?isPlaylist=true",
          },
        ]}
      />

      <SiteLinksSearchBoxJsonLd
        url="https://www.fantv.in/"
        potentialActions={[
          {
            target: "https://www.fantv.in/search?q",
            queryInput: "search_term_string",
          },
        ]}
      />
      <SocialProfileJsonLd
        type="Organization"
        name="Fan Tv"
        url="https://fantv.in/"
        sameAs={[
          "https://instagram.com/fantv.official",
          "https://www.facebook.com/FanTV.in",
          "https://www.youtube.com/@FanTV.official",
          "https://twitter.com/FanTV_official/",
          "https://www.linkedin.com/company/fantv-official/",
        ]}
      />
    </>
  );
};

export default AppSeo;
