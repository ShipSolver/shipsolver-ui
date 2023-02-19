import React, { useMemo } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Paper from "../../../../../components/roundedPaper";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

interface CardColumnProps {
  title?: string;
  cardContents?: React.ReactNode[];
  $customHeight?: string;
  customPadding?: string;
  isEditable?: boolean;
  action?: () => void;
  fullHeight?: boolean;
}

export const CardColumn = ({
  title,
  cardContents,
  $customHeight,
  customPadding,
  isEditable,
  action,
  fullHeight,
}: CardColumnProps) => {
  const cards = useMemo(
    () => cardContents?.map((content) => <StyledCard>{content}</StyledCard>),
    [cardContents]
  );

  return (
    <Container
      customPadding={customPadding}
      // sx={fullHeight ? { height: "50%" } : undefined}
    >
      {title ? (
        <TitlePaper>
          <Typography variant="h2" fontWeight="bold">
            {title}
          </Typography>
        </TitlePaper>
      ) : null}

      <CardContainerPaper
        $customHeight={$customHeight}
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        {cards}
      </CardContainerPaper>
      {isEditable && action ? (
        <AddButton onClick={() => action()}>
          <AddIcon />
        </AddButton>
      ) : null}
    </Container>
  );
};

export const TitlePaper = styled(Paper)({
  display: "inline-block",
  position: "relative",
  left: "50%",
  transform: "translateX(-50%)",
  padding: "8px 16px",
  marginBottom: "8px",
});

const CardContainerPaper = styled(Paper)<{ $customHeight?: string }>(
  ({ theme, $customHeight }) => ({
    height: $customHeight ?? "44vh",
    backgroundColor: theme.palette.secondary.light,
    padding: "8px",
    overflowY: "scroll",
  })
);

const StyledCard = styled(Card)({
  padding: 10,
  margin: 15,
});

const AddButton = styled(IconButton)`
  position: absolute;
  bottom: 4px;
  right: 4px;
  background-color: white;
`;

export const Container = styled("div")<{ customPadding?: string, $customHeight?: string }>(
  ({ theme, customPadding, $customHeight }) => ({
    borderRadius: "var(--ss-brand-border-radius)",
    backgroundColor: theme.palette.secondary.main,
    padding: customPadding ?? "16px",
    position: "relative",
    width: "300px",
    height: $customHeight
  })
);