export type QueryData = {
  allMarkdownRemark: {
    nodes: {
      frontmatter: {
        title: string;
        tab: string;
        order: number;
        image: any;
      };
      html: string;
    }[];
  };
};
export type Tab = {
  tab: string;
  title: string;
  order: number;
  html: string;
  image: any;
};
