import React, { useMemo } from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Paper from "../../../../../components/roundedPaper";
import { styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Loading } from "../../../../../components/loading";

interface CardColumnProps {
  title?: string;
  cardContents?: React.ReactNode[];
  isEditable?: boolean;
  action?: () => void;
  loading?: boolean;
  error?: string;
  $height: string;
}

export const CardColumn = ({
  title,
  cardContents,
  isEditable,
  action,
  $height,
  loading,
  error,
}: CardColumnProps) => {
  // const cards = useMemo(
  //   () =>
  //     cardContents?.map((content, idx) => (
  //       <StyledCard key={idx}>{content}</StyledCard>
  //     )),
  //   [cardContents]
  // );

  if (loading) {
    return (
      <Container>
        <CardContainerPaper
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
          $height={$height}
        >
          <Loading />
        </CardContainerPaper>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <CardContainerPaper
          sx={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
          $height={$height}
        >
          <Typography color="red" align="center">
            {error}
          </Typography>
        </CardContainerPaper>
      </Container>
    );
  }

  return (
    <Container>
      {title ? (
        <TitlePaper>
          <Typography variant="h2" fontWeight="bold">
            {title}
          </Typography>
        </TitlePaper>
      ) : null}

      <CardContainerPaper
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
        }}
        $height={$height}
      >
        {cardContents}
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
  padding: "8px 16px",
  marginBottom: "8px",
  textAlign: "center",
});

const CardContainerPaper = styled(Paper)<{ $height: string }>(
  ({ theme, $height }) => ({
    backgroundColor: theme.palette.secondary.light,
    padding: "8px",
    height: $height,
    overflow: "scroll",
  })
);

const AddButton = styled(IconButton)`
  position: absolute;
  bottom: 4px;
  right: 4px;
  background-color: white;
`;

export const Container = styled("div")(({ theme }) => ({
  borderRadius: "var(--ss-brand-border-radius)",
  backgroundColor: theme.palette.secondary.main,
  padding: "16px",
  position: "relative",
  width: "100%",
}));
