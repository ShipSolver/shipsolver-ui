import { atom } from "recoil";
import { CommodityType } from '../components/commodities';


export const commoditiesAtom = atom<CommodityType[] | null>({
    key: "commodities",
    default: null,
});