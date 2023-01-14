import React from "react";

interface CustomerSignatureProps {
  urls?: string[];
}

export const CustomerSignature = ({ urls }: CustomerSignatureProps) => {
  return (
    <div>
      <h3>Customer Signatures</h3>
      {urls?.map((url) => {
        <a href={url}>{url}</a>;
      })}
    </div>
  );
};
