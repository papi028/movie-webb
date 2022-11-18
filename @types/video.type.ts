import { IDefinitionLoklok, ISubtitlingLoklok } from "./episode.type";
import { IObjIdName } from "./movie.type";

export interface IMediaPreview {
  category: number;
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  duration: number;
  id: string;
  introduction: string;
  like: false;
  likeCount: number;
  mediaInfo: {
    definitionList: IDefinitionLoklok[];
    id: number;
    resourceType: number;
    subtitlingList: ISubtitlingLoklok[];
  };
  name: string;
  refList: {
    category: number;
    coverHorizontalUrl: string;
    coverVerticalUrl: string;
    drameTypeVo: any;
    id: string;
    name: string;
    score: number;
    tagList: IObjIdName[];
    year: number;
  }[];
  upInfo: {
    enable: boolean;
    upId: number;
    upImgUrl: string;
    upName: string;
    userId: any;
  };
}
