export interface Game {
  id: string;
  title: string;
  url: string;
  thumbnail: string;
  description?: string;
  category?: string;
  featured?: boolean;
  direct?: boolean;
}

export interface App {
  name: string;
  url: string;
  img: string;
}
