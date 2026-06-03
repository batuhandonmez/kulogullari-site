import { PageShell } from "@/components/page-shell";
import {
  FinalCta,
  HeroSection,
  ProcessSection,
  ProjectsPreview,
  SectorsPreview,
  TrustSection,
} from "@/components/sections/home-sections";

export default function Home() {
  return (
    <PageShell>
      <HeroSection />
      <SectorsPreview />
      <ProcessSection />
      <ProjectsPreview />
      <TrustSection />
      <FinalCta />
    </PageShell>
  );
}
