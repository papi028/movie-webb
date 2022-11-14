export interface ICategoryResult {
  coverVerticalUrl: string;
  domainType: number;
  id: string;
  name: string;
  score: string;
  sort: string;
}

export interface IFilter {
  id: number;
  name: string;
  params: string;
  screeningItems: {
    id: number;
    items: {
      name: string;
      params: string;
      screeningType: string;
    }[];
  }[];
}
