import Head from "next/head";

export default function CustomHead({ title = "A Taverna" }) {
  return (
    <Head>
      <title>{title}</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}
