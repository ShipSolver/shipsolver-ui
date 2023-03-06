import React from "react";
import Loading from "../../../../../components/loading";
interface CustomerSignatureProps {
  url?: string;
  loading?: boolean;
}

export const CustomerSignature = ({ url, loading }: CustomerSignatureProps) => {
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <h3>Customer Signatures</h3>
      {url ? (
        <a href={url} key={url}>
          Signature
        </a>
      ) : (
        "No customer signature available"
      )}
      ;
    </>
  );
};
