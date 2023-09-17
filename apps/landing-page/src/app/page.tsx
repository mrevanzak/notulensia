import {
  AppFooter,
  AppHeader,
  Blog,
  CallToAction,
  Features,
  HeroSection,
  Stats,
  Testimonials,
} from "@platform/components";

export default function Page(): JSX.Element {
  return (
    <>
      <AppHeader />
      <main className="space-y-40 mb-40">
        <HeroSection />
        <Features />
        <Stats />
        <Testimonials />
        <CallToAction />
        <Blog />
      </main>
      <AppFooter />
    </>
  );
}
