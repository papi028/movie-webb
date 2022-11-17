import { IEpisodeRoom, IEpisodeVo, IQuality, ISubtitle } from "./episode.type";

export interface IObjIdName {
  id: number;
  name: string;
}

export interface ICast {
  image: string;
  localName: string;
  role: string;
  roleName: string;
  starId: number;
}

export interface IRefItem {
  category: number;
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  drameTypeVo?: any;
  id: string;
  name: string;
  seriesNo: number;
}

export interface ILikeMovie {
  areaList: IObjIdName[];
  areaNameList: string[];
  category: number;
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  drameTypeVo?: any;
  id: string;
  name: string;
  seriesNo: number;
  score: number;
  tagList: IObjIdName[];
  tagNameList: string[];
  upImgUrl: string;
  upName: string;
  year: number;
}

export interface IMovieDetailsLoklok {
  aliasName: string;
  areaNameList: string[];
  areaList: IObjIdName[];
  collect: boolean;
  category: number;
  coverHorizontalUrl: string;
  coverHorizontalUrlJson: string;
  coverVerticalUrl: string;
  drameTypeVo: { drameName: string; drameType: string };
  episodeCount?: number;
  episodeRoomListVo: IEpisodeRoom;
  episodeVo: IEpisodeVo[];
  id: string;
  introduction: string;
  likeList: ILikeMovie[];
  name: string;
  nameJson: string;
  refList: IRefItem[];
  reserved: boolean;
  score: number;
  showSetName: boolean;
  starList: ICast[];
  tagList: IObjIdName[];
  length: number;
  tagNameList: string[];
  translateType: number;
  upInfo: { upId: number; upImgUrl: string; upName: string };
  updateInfo?: any;
  year: number;
}

export interface IMovieDetails extends IMovieDetailsLoklok {
  qualities: IQuality[];
  subtitles: ISubtitle[];
  currentEpName: number;
}

export interface IMovieSearch {
  areas: IObjIdName[];
  categoryTag: IObjIdName[];
  coverHorizontalUrl: string;
  coverVerticalUrl: string;
  domainType: number;
  dramaType: {
    code: string;
    name: string;
  };
  duration: string;
  id: string;
  name: string;
  releaseTime: string;
  sort: string;
  upInfo: {
    enable: boolean;
    upId: number;
    upImgUrl: string;
    upName: string;
    userId: string | null;
  };
}

export interface IHistoryView {
  key: string;
  id: string;
  name: string;
  category: string;
  coverVerticalUrl: string;
  coverHorizontalUrl: string;
  episode: number;
  episodeName: number;
  currentEpName: string;
}
