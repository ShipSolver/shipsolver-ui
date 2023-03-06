import React from "react";
import Loading from "../../../../../components/loading";

interface PicturesProps {
  urls?: string[];
  loading?: boolean;
}

export const Pictures = ({ urls, loading }: PicturesProps) => {
  if (loading) {
    return <Loading />;
  }

  if (!urls || !urls.length) {
    return (
      <>
        <h3>Pictures</h3>
        No pictures available
      </>
    );
  }

  return (
    <>
      <h3>Pictures</h3>
      {urls.map((url, idx) => {
        <a href={url} key={url}>
          {`Picture ${idx}`}
        </a>;
      })}
    </>
  );
};
