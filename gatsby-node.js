const { EVENTS } = require('./src/constants/events.ts');
// gatsby-node.js
const API = process.env.GATSBY_APP_API_BASE_URL;
// console.log(process.env.GATSBY_APP_API_BASE_URL);

async function fetchJSON(path) {
  const res = await fetch(`${API}${path}`);
  if (!res.ok) throw new Error(`Fetch failed: ${path}`);
  const resut = await res.json();

  return resut.data;
}
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type MarkdownRemarkFrontmatter {
      title: String
      tab:   String
      order: Int
      image: File @fileByRelativePath
    }

    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter
    }
  `);
};

exports.createPages = async ({ actions }) => {
  const { createPage } = actions;

  const [departamentos, unidades, cursos, exameFase, bulkFacultys, sections] =
    await Promise.all([
      fetchJSON('/academic-department'),
      fetchJSON('/academic-faculty'),
      fetchJSON('/course'),
      fetchJSON('/admission-exame/fases'),
      fetchJSON('/academic-faculty/with-courses'),
      fetchJSON('/offered-course-section'),
    ]);

  departamentos.forEach((dep) => {
    createPage({
      path: `/departamentos/${dep.id}`,
      component: require.resolve('./src/templates/departments.tsx'),
      context: { departamento: dep },
    });
  });
  createPage({
    path: `/exames-de-acesso/fases-dos-exames`,
    component: require.resolve('./src/templates/exames-fase.tsx'),
    context: exameFase,
  });

  await Promise.all(
    unidades.map(async (unidade) => {
      const deps = departamentos.filter(
        (d) => d.academicFacultyId === unidade.id,
      );

      createPage({
        path: `/unidades/${unidade.id}`,
        component: require.resolve('./src/templates/academic-faculty.tsx'),
        context: { unidade, departamentos: deps },
      });
    }),
  );

  cursos.forEach((curso) => {
    createPage({
      path: `/cursos/${curso.id}`,
      component: require.resolve('./src/templates/course.tsx'),
      context: { curso },
    });

    createPage({
      path: `/exames/grade-curricular`,
      component: require.resolve('./src/templates/curiclume-grade.tsx'),
      context: { curso },
    });
  });

  createPage({
    path: '/propinas',
    component: require.resolve('./src/templates/tutium.tsx'),
    context: { sections },
  });
  createPage({
    path: 'exames-de-acesso',
    component: require.resolve('./src/templates/exames-info.tsx'),
    context: {},
  });
  createPage({
    path: 'exames-de-acesso/set-up',
    component: require.resolve('./src/templates/registration-setup.tsx'),
    context: { bulkFacultys },
  });
  createPage({
    path: 'eventos',
    component: require.resolve('./src/templates/eventes.tsx'),
    // context: { bulkFacultys },
  });
  EVENTS.forEach((event) => {
    createPage({
      path: `evento/${event.slug}`,
      component: require.resolve('./src/templates/event-page.tsx'),
      context: {
        event,
      },
    });
  });
};
