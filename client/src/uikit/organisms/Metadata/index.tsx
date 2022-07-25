import Head from 'next/head'

export interface MetadataProps {
  title?: string
}

const Metadata = ({ title }: MetadataProps) => {
  return (
    <Head>
      <title>{title}</title>

      <meta name="title" content={title} />

      <meta property="og:title" content={title} />

      <link rel="shortcut icon" href="/favicon.ico" />
    </Head>
  )
}

export default Metadata
