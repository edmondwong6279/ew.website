/**
 * Search input types
 */

export type HomePageSearchType = "home-page?populate=deep";
export type AboutPageSearchType = "about-page?populate=deep";
export type SkillsPageSearchType = "skills-page?populate=deep";
export type PortfolioPageSearchType = "portfolio-page?populate=deep";
export type BlogPageSearchType = "blog-page?populate=deep";
export type BlogManySearchType = "blogs?populate=deep";
export type BlogSingleSearchType =
  `blogs?filters[slug][$eq]=${string}&populate=deep`;

export type AllInputTypes =
  | HomePageSearchType
  | AboutPageSearchType
  | SkillsPageSearchType
  | PortfolioPageSearchType
  | BlogPageSearchType
  | BlogSingleSearchType
  | BlogManySearchType;

export type PossibleInputTypes<T extends AllInputTypes> =
  T extends HomePageSearchType
    ? HomePageType
    : T extends AboutPageSearchType
    ? AboutPageType
    : T extends PortfolioPageSearchType
    ? PortfolioPageType
    : T extends BlogPageSearchType
    ? GenericPageType
    : T extends SkillsPageSearchType
    ? SkillsPageType
    : T extends BlogManySearchType
    ? BlogManyResult
    : T extends BlogSingleSearchType
    ? BlogSingleResult
    : never;

/**
 * Search output types
 */

export type DateAttribute = {
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
};

export type HomePageType = {
  id: number;
  attributes: DateAttribute & {
    title: string;
    tagline: string;
    description: string;
    mediaUrl: string;
    contactItems: {
      id: number;
      name: string;
      linkText: string;
      description: string;
      link: string;
    }[];
  };
};

export type GenericPageType = {
  id: number;
  attributes: DateAttribute & {
    title: string;
    description: string;
  };
};

export type AboutPageType = {
  id: number;
  attributes: DateAttribute & {
    title: string;
    description: string;
    aboutGroups: {
      id: number;
      groupTitle: string;
      aboutItems: {
        id: number;
        title: string;
        description: string;
        subtitle: string;
        mediaUrl?: string;
      }[];
    }[];
  };
};

export type PortfolioItem = {
  id: number;
  title: string;
  description: string;
  repositoryUrl: string;
  projectUrl: string;
  mediaUrl: string;
};

export type PortfolioItems = PortfolioItem[];

export type PortfolioPageType = {
  id: number;
  attributes: DateAttribute & {
    title: string;
    description: string;
    portfolioItems: PortfolioItems;
  };
};

export type SkillGroups = {
  id: number;
  groupName: string;
  groupDescription?: string;
  skills: {
    id: number;
    title: string;
    description: string;
    value: number;
  }[];
}[];

export type SkillsPageType = {
  id: number;
  attributes: DateAttribute & {
    title: string;
    description: string;
    skillGroups: SkillGroups;
  };
};

export type BlogType = {
  id: number;
  attributes: DateAttribute & {
    title: string;
    description: string;
    content: string;
    slug: string;
    postDate: string;
  };
};

export type BlogManyResult = BlogType[];

export type BlogSingleResult = [BlogType] | [];
