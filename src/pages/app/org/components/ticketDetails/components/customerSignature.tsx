import React from "react";

interface CustomerSignatureProps {}

export const CustomerSignature = (props: CustomerSignatureProps) => {
  return (
    <div>
      <h3>Customer Signature</h3>
      <a
        href="https://timesofindia.indiatimes.com/thumb/msid-70238371,imgsize-89579,width-400,resizemode-4/70238371.jpg"
        download
      >
        https://timesofindia.indiatimes.com/thumb/msid-70238371,imgsize-89579,width-400,resizemode-4/70238371.jpg
      </a>
    </div>
  );
};
