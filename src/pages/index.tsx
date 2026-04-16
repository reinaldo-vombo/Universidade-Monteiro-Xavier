import * as React from "react"
import { type HeadFC, type PageProps } from "gatsby"
import { SEO } from "../components/seo"
import { ParallaxSection } from "../components/ParallaxSection"
import { HeroSection } from "../components/sections/hero-section"
import { AboutSection } from "../components/sections/about-section"
import { useQueries, useQuery } from "@tanstack/react-query"
import { api } from "../lib/services/api"
import AcademicFaculty from "../components/sections/academic-faculty"
import Departments from "../components/sections/departments"
import Footer from "../components/sections/footer"

const IndexPage: React.FC<PageProps> = () => {
  const results = useQueries({
    queries: [
      {
        queryKey: ['academic-faculty'],
        queryFn: () => api.unidades.list(),
        staleTime: 1000 * 60 * 10,
      },
      {
        queryKey: ['academic-department'],
        queryFn: () => api.departamentos.list(),
        staleTime: 1000 * 60 * 10,
      },
    ],
  });

  // Desestruturar resultados
  const [facultyQuery, departmentsQuery] = results;

  const isLoading = results.some(q => q.isLoading);
  const isError = results.some(q => q.isError);

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar dados</p>;

  return (
    <>
      <HeroSection />
      <AboutSection />
      <AcademicFaculty data={facultyQuery.data.data} />
      <Departments data={departmentsQuery.data && departmentsQuery.data.data} />
      <Footer />
    </>

  )
}

export default IndexPage;

export const Head: HeadFC = () => <SEO />
