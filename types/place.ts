export interface PlaceReview {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Place {
  id: string;
  title: string;
  shortDescription: string;
  category: string;
  image: string;
  images?: string[];
  location: string;
  rating: number;
  bestTimeToVisit: string;
  overview: string;
  attractions: string[];
  reviews: PlaceReview[];
}
