import { ICast, ILikeMovie, IObjIdName } from "./movie.type";

export interface IDefinitionLoklok {
  code: string;
  description: string;
  fullDescription: string;
}

export interface ISubtitlingLoklok {
  language: string;
  languageAbbr: string;
  subtitlingUrl: string;
  translateType: number;
}

export interface IQuality {
  quality: number;
  url: string;
}

export interface ISubtitle {
  url: string;
  lang: string;
  language: string;
}

export interface IEpisodeVo {
  id: number;
  definitionList: IDefinitionLoklok[];
  name: string;
  nameJson: string;
  resourceType: number;
  seriesNo: number;
  subtitlingList: ISubtitlingLoklok[];
}

export interface IEpisodeRoom {
  category: number;
  episodeId: string;
  episodeName: string;
  number: number;
  roomId: string;
  seasonID: string;
  seasonName: string;
}

export interface IEpisode {
  aliasName: string;
  areaList: IObjIdName[];
  areaNameList: string[];
  category: number;
  collect: boolean;
  currentEpisode: number;
  contentTagResourceList: [];
  coverHorizontalUrl: string;
  coverHorizontalUrlJson: string;
  coverVerticalUrl: string;
  drameTypeVo: {
    drameName: string;
    drameType: string;
  };
  episodeCount: number;
  episodeRoomListVo: IEpisodeRoom;
  episodeVo: IEpisodeVo[];
  id: string;
  introduction: string;
  likeList: ILikeMovie[];
  name: string;
  nameJson: string;
  refList: [];
  reserved: boolean;
  score: number;
  seriesNo: number | any;
  showSetName: boolean;
  starList: ICast[];
  tagList: IObjIdName[];
  tagNameList: string[];
  translateType: number;
  upInfo: {
    upId: number;
    upImgUrl: string;
    upName: string;
  };
  updateInfo: {
    updatePeriod: string;
    updateStatus: number;
  };
  year: number;
  currentEpName: number;
  qualities: IQuality[];
  subtitles: ISubtitle[];
  episode: number;
}
