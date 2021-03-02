import { Person } from "./person";

export interface Movie {
  name: string;
  rating: string;
  releaseDate: string;
  actors: Array<Person>;
  poster: string;
}
