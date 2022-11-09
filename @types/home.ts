export interface IBanner {
  id: number;
  title: string;
  imageUrl: string;
}

export interface IRecommendVO {
  category: number;
  contentType: string;
  id: number;
  imageUrl: string;
  jumpAddress: string;
  jumpType: string;
  needLogin: boolean;
  resourceNum: number;
  resourceStatus: number;
  showMark: boolean;
  title: string;
}

export interface IHomeSection {
  bannerProportion?: number | null;
  blockGroupNum?: any;
  coverType?: any;
  homeSectionId: number;
  homeSectionName: string;
  homeSectionType: string;
  recommendContentVOList: IRecommendVO[];
  refId?: any;
  refRedirectUrl: string;
}

export interface IResponseHome {
  page: number;
  recommendItems: IHomeSection[];
  searchKeyWord: string;
}
