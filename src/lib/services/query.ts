export const getAcademicFaculty = async () => {
  const resut = fetch(
    `${process.env.GATSBY_APP_API_BASE_URL}/academic-faculty`,
  ).then((res) => res.json());
  return resut;
};
