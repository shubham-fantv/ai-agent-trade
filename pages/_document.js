import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossorigin />
          <link
            href='https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,200..800&display=swap'
            rel='stylesheet'
          />

          <link
            rel='preload'
            as='video'
            href='/video/bgVideo.webm'
            type='video/webm'
          />
          <link
            rel='preload'
            as='video'
            href='/video/tokenAnimation.webm'
            type='video/webm'
          />

          <meta
            name='name'
            content='Agent Nation - Ultimate AI Agent Marketplace on SUI'
          />
          <meta
            name='description'
            content='Ultimate AI Agent Marketplace on SUI'
          />
          {/* <meta
            name="image"
            content="https://assets.artistfirst.in/uploads/1736488883453-OGImageNew.png"
          /> */}
          <meta property='og:url' content={process.env.NEXT_PUBLIC_WEB_URL} />
          <meta property='og:type' content='website' />
          <meta
            property='og:title'
            content='Agent Nation - Ultimate AI Agent Marketplace on SUI'
          />
          <meta
            property='og:description'
            content='Ultimate AI Agent Marketplace on SUI'
          />
          {/* <meta
            property="og:image"
            content="https://assets.artistfirst.in/uploads/1736488883453-OGImageNew.png"
          /> */}
          <meta name='twitter:card' content='summary_large_image' />
          <meta
            name='twitter:title'
            content='Agent Nation - Ultimate AI Agent Marketplace on SUI'
          />
          <meta
            name='twitter:description'
            content='Ultimate AI Agent Marketplace on SUI'
          />
          {/* <meta
            name="twitter:image"
            content="https://assets.artistfirst.in/uploads/1736488883453-OGImageNew.png"
          /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
