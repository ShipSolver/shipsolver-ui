import React from "react";

interface CustomerSignatureProps {
  urls?: string[];
}

export const CustomerSignature = ({ urls }: CustomerSignatureProps) => {
  return (
    <>
      <h3>Customer Signatures</h3>
      {urls?.map((url) => {
        <a href={url} key={url}>
          {url}
        </a>;
      })}
    </>
  );
};
