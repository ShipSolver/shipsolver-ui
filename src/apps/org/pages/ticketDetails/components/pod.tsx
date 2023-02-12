import React from "react";

interface PODProps {
  urls?: string[];
}

export const POD = ({ urls }: PODProps) => {
  return (
    <>
      <h3>Proof of delivery</h3>
      {urls?.map((url) => {
        <a href={url} key={url}>{url}</a>;
      })}
    </>
  );
};
