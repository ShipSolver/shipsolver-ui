import React from "react";
import Loading from "../../../../../components/loading";

interface PODProps {
  url?: string;
  loading?: boolean;
}

export const POD = ({ url, loading }: PODProps) => {
  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <h3>Proof of delivery</h3>
      {url ? (
        <a href={url} key={url}>
          POD
        </a>
      ) : (
        "No proof of delivery available"
      )}
    </>
  );
};
