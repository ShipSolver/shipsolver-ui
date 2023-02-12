import React from "react";

interface PicturesProps {
  urls?: string[];
}

export const Pictures = ({ urls }: PicturesProps) => {
  return (
    <>
      <h3>Pictures</h3>
      {urls?.map((url) => {
        <a href={url} key={url}>
          {url}
        </a>;
      })}
    </>
  );
};
