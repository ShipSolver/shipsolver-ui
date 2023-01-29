import React from "react";

interface PicturesProps {
  urls?: string[];
}

export const Pictures = ({urls}: PicturesProps) => {
  return (
    <div>
      <h3>Pictures</h3>
      {urls?.map((url) => {
        <a href={url}>
          {url}
        </a>;
      })}
    </div>
  );
};
