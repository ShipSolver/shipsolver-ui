import { atom } from "recoil";

export const PDFViewAtom = atom<number>({
  key: "zoomPDF",
  default: 4,
});

export const surveyViewAtom = atom<number>({
  key: "zoomSurvey",
  default: 8,
});

export const pageNumAtom = atom<number>({
  key: "pageNum",
  default: 1,
});
