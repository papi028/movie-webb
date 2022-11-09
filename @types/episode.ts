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
