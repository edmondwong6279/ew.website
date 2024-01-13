import { AllInputTypes, PossibleInputTypes } from "@/types";

/**
 *
 * We use populate=deep from a contentful plugin so we can get nested objects
 *
 * @param searchString a string for fetching data from the cms, must be of the
 * format shown in the usage below.
 * @returns JS object of the data from the CMS
 * @example
 * // get page data
 * await getData("home-page?populate=deep");
 * await getData("about-page?populate=deep");
 * await getData("skills-page?populate=deep");
 * await getData("portfolio-page?populate=deep");
 * await getData("blog-page?populate=deep");
 * // get list of all blogs
 * await getData("blogs?populate=deep");
 * // search for a blog by slug
 * await getData(`blogs?filters[slug][$eq]=${string}&populate=deep`);
 *
 */
export const getData = async <T extends AllInputTypes>(
  searchString: T
): Promise<PossibleInputTypes<T>> => {
  const requestUrl = `${
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://127.0.0.1:1337"
  }/api/${searchString}`;

  const response = await fetch(requestUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.CMS_KEY}`
    },
    next: { revalidate: 3600 } // one hour cache
  });

  if (!response.ok) {
    console.error(response.statusText);
    throw new Error(`An error occured please try again`);
  }

  try {
    const { data } = JSON.parse(await response.text());

    return data;
  } catch (err) {
    console.error("Error formating results:", err);
    throw err;
  }
};
