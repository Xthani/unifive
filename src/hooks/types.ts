export interface HeaderPage {
  title: string;
  description: string;
  logo_description: string;
  about_company: string;

  img: {
    id: string | number
    first_photo?: string;
    second_photo?: string;
    third_photo?: string;
    icon?: string;
  }[];
}

export interface Project {
  id: number;
  name: string;
  img: string;
  description: string;
}

export interface Feedback {
  id: number;
  user: string;
  avatar: string;
  position: string;
  feedback: string;
}

export interface NewsRes {
  id: number;
  title: string;
  description: string;
}

export interface FaqRes {
  id: number;
  title: string;
  description: string;
  img: string;
  logo: string;
  faq_lists: {
    id: number;
    item: string;
  }[];
}

export interface PartnersRes {
  id: number;
  img: string;
}

export interface LogosRes {
  id: number;
  logo: string;
}

export interface DataResponse {
  header_page: HeaderPage;
  logos: LogosRes[];
  projects: Project[];
  news: NewsRes[];
  feedback: Feedback[];
  partners: PartnersRes[];
  faq: FaqRes[];
}
