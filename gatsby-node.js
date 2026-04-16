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

  const [departamentos, unidades, cursos, exameFase, registos] =
    await Promise.all([
      fetchJSON('/academic-department'),
      fetchJSON('/academic-faculty'),
      fetchJSON('/course'),
      fetchJSON('/admission-exame/fases'),
      fetchJSON('/admission-exame'),
    ]);

  // ── Departamentos ──────────────────────────────────────
  departamentos.forEach((dep) => {
    //  console.log('node', dep);
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

  // ── Unidades académicas ────────────────────────────────
  // Para cada unidade busca os departamentos dela
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

  // ── Cursos + Grade Curricular ──────────────────────────
  cursos.forEach((curso) => {
    // Página principal do curso
    createPage({
      path: `/cursos/${id}`,
      component: require.resolve('./src/templates/course.tsx'),
      context: { curso },
    });

    // Página da grade curricular
    createPage({
      path: `/exames/grade-curricular`,
      component: require.resolve('./src/templates/curiclume-grade.tsx'),
      context: { curso },
    });
  });
  registos.forEach((registo) => {
    createPage({
      path: `exames-de-acesso/registo/${registo.id}`,
      component: require.resolve('./src/templates/exame.tsx'),
      context: { registo },
    });
  });
  createPage({
    path: 'exames-de-acesso',
    component: require.resolve('./src/templates/exames-info.tsx'),
    context: {}, // dados vêm da query GraphQL estática
  });
};
