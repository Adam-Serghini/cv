import "./App.css";
import {
  AtSign,
  Plane,
  ChefHat,
  Dumbbell,
  Gamepad2,
  Github,
  GraduationCap,
  Volleyball,
  HomeIcon,
  Linkedin,
  Phone,
  Sparkles,
  BookOpen,
  ExternalLink,
} from "lucide-react";
import { useState, useRef } from "react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { ExperienceCard } from "./components/custom/experience";
import { cvData } from "./data/cv";
import { ThemeProvider } from "@/components/theme-provider";
import { ModeToggle } from "./components/mode-toggle";
import { Card, CardContent } from "@/components/ui/card";
import { useReactToPrint } from "react-to-print";

// Custom hook for language management
const useLanguage = () => {
  const [lang, setLang] = useState<"fr" | "en">("fr");

  const toggleLanguage = () => setLang(lang === "fr" ? "en" : "fr");
  const isFrench = lang === "fr";

  return { lang, setLang, toggleLanguage, isFrench };
};

// Custom hook for skill icon loading with local fallback
const useSkillIcon = (skillName: string) => {
  const [iconSrc, setIconSrc] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Build CDN and local URLs
  const cdnUrl = `https://cdn.simpleicons.org/${skillName.replace(/\s+/g, "")}`;
  const localUrl = `${import.meta.env.BASE_URL}icon/${skillName.replace(
    /\s+/g,
    ""
  )}.png`;

  // On mount, try CDN first
  useState(() => {
    setIconSrc(cdnUrl);
  });

  const handleLoad = () => setIsLoaded(true);
  const handleError = () => {
    if (iconSrc === cdnUrl) {
      // Try local fallback
      setIconSrc(localUrl);
      setIsLoaded(false);
    } else {
      setHasError(true);
    }
  };

  return { iconSrc, isLoaded, hasError, handleLoad, handleError };
};

function App() {
  const { lang, setLang, toggleLanguage, isFrench } = useLanguage();

  const data = cvData[lang];

  // Ref for printable content
  const printRef = useRef<HTMLDivElement>(null);
  // Ensure dark mode is applied to the printable container during print if active
  const isDark = document.documentElement.classList.contains("dark");
  const handleBeforePrint = async () => {
    if (isDark && printRef.current) printRef.current.classList.add("dark");
  };
  const handleAfterPrint = () => {
    if (printRef.current) printRef.current.classList.remove("dark");
  };
  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `CV_Adam_Serghini_${lang.toUpperCase()}`,
    onBeforePrint: handleBeforePrint,
    onAfterPrint: handleAfterPrint,
  });

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {/* Main app: hide in print */}
      <div className="flex min-h-screen no-print flex-col lg:flex-row">
        {/* Colonne gauche : 1/3 */}
        <aside className="w-full lg:w-1/4 bg-gray-100 dark:bg-gray-900 p-4 lg:p-6 flex flex-col gap-4">
          {/* Photo */}
          <img
            src={`${import.meta.env.BASE_URL}res/Adam.png`}
            className="rounded-xl w-full max-w-48 mx-auto lg:mx-0 lg:max-w-full"
            alt="Adam Serghini"
          />

          {/* Contacts + Réseaux */}
          <Card className="p-4 rounded-xl border gap-2">
            <div className="flex items-center gap-2 text-sm">
              <HomeIcon size="16" className="text-gray-500" /> {data.location}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Phone size="16" className="text-gray-500" /> {data.phone}
            </div>
            <a
              href={`mailto:${data.mail}?subject=You are Hired !`}
              className="flex items-center gap-2 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <AtSign size="16" className="text-gray-500" /> {data.mail}
            </a>
            <a
              href={`https://www.linkedin.com/in/${data.linkedin}/`}
              className="flex items-center gap-2 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size="16" className="text-gray-500" /> /adam-Serghini
            </a>
            <a
              href={`https://github.com/${data.github}`}
              className="flex items-center gap-2 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size="16" className="text-gray-500" /> /Adam-Serghini
            </a>
          </Card>
          {/* Skills */}
          <Card className="p-4 rounded-xl border gap-3">
            <Badge variant="secondary" className="text-xs font-semibold">
              Skills | Code
            </Badge>
            <div className="flex flex-row flex-wrap items-start content-start gap-1.5">
              {data.skills.code.map((skill: string, index: number) => {
                const { iconSrc, isLoaded, hasError, handleLoad, handleError } =
                  useSkillIcon(skill);
                return (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {!hasError && iconSrc && (
                      <img
                        width="14px"
                        src={iconSrc}
                        className={`inline-block mr-1 transition-opacity duration-200 ${
                          isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                        alt={skill}
                        onLoad={handleLoad}
                        onError={handleError}
                      />
                    )}
                    {skill}
                  </Badge>
                );
              })}
            </div>
          </Card>
          <Card className="p-4 rounded-xl border gap-3">
            <Badge variant="secondary" className="text-xs font-semibold">
              Skills | Project
            </Badge>
            <div className="flex flex-row flex-wrap items-start content-start gap-1.5">
              {data.skills.projet.map((skill: string, index: number) => {
                const { iconSrc, isLoaded, hasError, handleLoad, handleError } =
                  useSkillIcon(skill);
                return (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {!hasError && iconSrc && (
                      <img
                        width="14px"
                        src={iconSrc}
                        className={`inline-block mr-1 transition-opacity duration-200 ${
                          isLoaded ? "opacity-100" : "opacity-0"
                        }`}
                        alt={skill}
                        onLoad={handleLoad}
                        onError={handleError}
                      />
                    )}
                    {skill}
                  </Badge>
                );
              })}
            </div>
          </Card>
          {/* Interests */}
          <Card className="p-4 rounded-xl border gap-2 justify-between gap-1 content-between">
            <Badge className="flex gap-1 items-center" variant="secondary">
              <Sparkles /> {lang === "fr" ? "Centres d'intérêt" : "Hobbies"}
            </Badge>
            <div className="flex gap-1 items-center">
              <Plane size="16" />{" "}
              {lang === "fr" ? "Voyage & exploration" : "Travel & exploration"}
            </div>
            <div className="flex gap-1 items-center">
              <Gamepad2 size="16" /> {lang === "fr" ? "esport" : "Esports"}
            </div>
            <div className="flex gap-1 items-center">
              <Dumbbell size="16" />{" "}
              {lang === "fr" ? "Musculation" : "Weight training"}
            </div>
            <div className="flex gap-1 items-center">
              <ChefHat size="16" /> {lang === "fr" ? "Cuisine" : "Cooking"}
            </div>
            <div className="flex gap-1 items-center">
              <Volleyball size="16" />{" "}
              {lang === "fr" ? "Volley Ball" : "Volleyball"}
            </div>
          </Card>

          <Card className="p-4 rounded-xl border gap-2 justify-between gap-1 content-between border border-orange-600">
            <Badge
              variant="secondary"
              className="mb-2 flex items-center gap-2 text-orange-600 border border-orange-600"
            >
              <BookOpen size="16" />
              Publications
            </Badge>
            <CardContent className="text-sm text-muted-foreground space-y-1">
              <div>
                <strong>
                  2024 - GWFSS: Wheat Semantic Segmentation Dataset
                </strong>
                <p>
                  Open-source dataset for semantic segmentation of wheat
                  imagery.
                </p>
                <a
                  href="https://www.global-wheat.com/gwfss.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-orange-600 hover:underline mt-1"
                >
                  Visit website
                  <ExternalLink size="16" />
                </a>
              </div>
              <div>
                <strong>
                  2024 - Predicting Sunflower Head Moisture Content Using
                  Self-Supervised Intermediate Representations
                </strong>
                <p>
                  Leveraging autoencoder-based intermediate features to estimate
                  moisture content in sunflower heads from image data.
                </p>
                <a
                  href="https://helexproject.eu/fr/le-projet-helex/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-orange-600 hover:underline mt-1"
                >
                  Visit website
                  <ExternalLink size="16" />
                </a>
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Colonne droite : 2/3 */}
        <main className="w-full lg:w-3/4 bg-light-background dark:bg-dark-background text-light-text dark:text-dark-text">
          <div className="w-full flex flex-col sm:flex-row justify-between items-center py-2 px-4 bg-white dark:bg-gray-900 gap-2">
            {/* Groupe de gauche : badges + drapeaux */}
            <div className="flex items-center gap-2 flex-wrap">
              <Badge
                variant="secondary"
                className="flex items-center gap-1 text-xs sm:text-sm"
              >
                {data.title}
              </Badge>
              <Badge
                variant="secondary"
                className="flex items-center gap-1 text-xs sm:text-sm"
              >
                <p className="font-extrabold italic text-purple-300">XP</p>
                4+ ans
              </Badge>
              <div className="flex items-center gap-1">
                <img
                  src={`${import.meta.env.BASE_URL}res/fr.png`}
                  width="24px"
                  className="sm:w-9"
                  alt="French"
                />
                <img
                  src={`${import.meta.env.BASE_URL}res/gb.png`}
                  width="24px"
                  className="sm:w-9"
                  alt="English"
                />
              </div>
            </div>

            {/* Groupe de droite : boutons */}
            <div className="flex items-center gap-2">
              <ModeToggle />
              <Button
                variant="themeToggle"
                size="sm"
                onClick={toggleLanguage}
                className="text-xs sm:text-sm"
                aria-label={`Switch to ${lang === "fr" ? "English" : "French"}`}
              >
                {lang === "fr" ? "EN" : "FR"}
              </Button>
              <Button
                className="no-print text-xs sm:text-sm"
                variant="themeToggle"
                size="sm"
                onClick={() => {
                  console.log("printRef.current:", printRef.current);
                  handlePrint();
                }}
                aria-label="Export CV as PDF"
              >
                Export PDF
              </Button>
            </div>
          </div>
          <section className="mb-6 m-3">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-blue-400 drop-shadow-lg mb-3">
              <span className="bg-gradient-to-r from-neutral-500 to-neutral-400 text-transparent bg-clip-text">
                Adam SERGHINI
              </span>
            </h1>
            <p className="text-base sm:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              {data.summary}
            </p>
          </section>
          <section className="p-4 space-y-6">
            {/* Cartes en ligne */}
            <div className="flex flex-col gap-4 w-full">
              {/* Work Experience */}
              {data.experiences
                .filter((exp: any) => !exp.isFormation)
                .map((exp: any, idx: number) => (
                  <ExperienceCard
                    key={"work-" + idx}
                    company={exp.company}
                    position={exp.position}
                    location={exp.location}
                    duration={exp.duration}
                    icon={exp.icon}
                  >
                    <p className="text-sm mb-2 text-muted-foreground">
                      {exp.description}
                    </p>
                    <ul className="ml-4 space-y-1 text-sm text-muted-foreground text-left list-disc">
                      {exp.bullets &&
                        exp.bullets.map((bullet: string, bidx: number) => (
                          <li key={bidx}>{bullet}</li>
                        ))}
                    </ul>
                  </ExperienceCard>
                ))}
              {/* Formation/Education Split Line */}
              <div className="flex items-center gap-2 my-1">
                <GraduationCap size="36" className="text-lime-600" />
                <span className="text-lg font-bold text-lime-600">
                  {lang === "fr" ? "Formation" : "Education"}
                </span>
                <div className="flex-grow h-px bg-gradient-to-r from-lime-400 to-lime-900"></div>
              </div>
              {/* Formation/Education */}
              {data.experiences
                .filter((exp: any) => exp.isFormation)
                .map((exp: any, idx: number) => (
                  <ExperienceCard
                    key={"formation-" + idx}
                    company={exp.company}
                    position={exp.position}
                    location={exp.location}
                    duration={exp.duration}
                    icon={exp.icon}
                  >
                    <p className="text-sm mb-2 text-muted-foreground">
                      {exp.description}
                    </p>
                    <ul className="ml-4 space-y-1 text-sm text-muted-foreground text-left list-disc">
                      {exp.bullets &&
                        exp.bullets.map((bullet: string, bidx: number) => (
                          <li key={bidx}>{bullet}</li>
                        ))}
                    </ul>
                  </ExperienceCard>
                ))}
            </div>
          </section>
        </main>
      </div>
      {/* Print-only beautiful layout */}
      <div ref={printRef} className="print-only" style={{ display: "none" }}>
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            padding: "0",
            fontFamily: "Arial, sans-serif",
            color: "#222",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: "#2b4a6f",
              color: "white",
              padding: "24px 32px 16px 32px",
              borderRadius: "0 0 8px 8px",
              marginBottom: "24px",
            }}
          >
            <h1
              style={{
                fontSize: "2.2rem",
                fontWeight: "bold",
                margin: 0,
                letterSpacing: "1px",
              }}
            >
              {data.name}
            </h1>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: "1rem",
                marginTop: "8px",
              }}
            >
              <div>{data.location}</div>
              <div>{data.phone}</div>
              <div>{data.mail}</div>
              <div>LinkedIn: {data.linkedinLabel || data.linkedin}</div>
              <div>GitHub: {data.github}</div>
            </div>
          </div>
          {/* Summary */}
          <div style={{ marginBottom: "18px" }}>
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: "bold",
                color: "#2b4a6f",
                marginBottom: "4px",
                letterSpacing: "0.5px",
              }}
            >
              {lang === "fr" ? "Résumé" : "Summary"}
            </div>
            <div>{data.summary}</div>
          </div>
          {/* Experience & Education */}
          <div style={{ marginBottom: "18px" }}>
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: "bold",
                color: "#2b4a6f",
                marginBottom: "4px",
                letterSpacing: "0.5px",
              }}
            >
              {lang === "fr"
                ? "Expérience & Formation"
                : "Experience & Education"}
            </div>
            <div
              style={{ borderTop: "1.5px solid #b0b8c1", marginBottom: "10px" }}
            ></div>
            {data.experiences.map((exp: any, idx: number) => (
              <div key={idx} style={{ marginBottom: "14px" }}>
                <div
                  style={{
                    fontWeight: "bold",
                    fontSize: "1.05rem",
                    color: "#2b4a6f",
                  }}
                >
                  {exp.company} — {exp.position}
                </div>
                <div
                  style={{
                    fontStyle: "italic",
                    fontSize: "0.97em",
                    color: "#444",
                    marginBottom: "2px",
                  }}
                >
                  {exp.location} | {exp.duration}
                </div>
                <div>{exp.description}</div>
                {exp.bullets && exp.bullets.length > 0 && (
                  <ul style={{ margin: "0.25rem 0 0 1.2rem", padding: 0 }}>
                    {exp.bullets.map((bullet: string, bidx: number) => (
                      <li key={bidx} style={{ marginBottom: "2px" }}>
                        {bullet}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
          {/* Skills */}
          <div style={{ marginBottom: "18px" }}>
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: "bold",
                color: "#2b4a6f",
                marginBottom: "4px",
                letterSpacing: "0.5px",
              }}
            >
              {lang === "fr" ? "Compétences" : "Skills"}
            </div>
            <div style={{ marginBottom: "2px" }}>
              <span style={{ fontWeight: "bold" }}>
                {lang === "fr" ? "Code" : "Code"}:
              </span>{" "}
              {data.skills.code.join(", ")}
            </div>
            <div>
              <span style={{ fontWeight: "bold" }}>
                {lang === "fr" ? "Projet" : "Project"}:
              </span>{" "}
              {data.skills.projet.join(", ")}
            </div>
          </div>
          {/* Publications */}
          <div style={{ marginBottom: "0" }}>
            <div
              style={{
                fontSize: "1.1rem",
                fontWeight: "bold",
                color: "#2b4a6f",
                marginBottom: "4px",
                letterSpacing: "0.5px",
              }}
            >
              {lang === "fr" ? "Publications" : "Publications"}
            </div>
            <div
              style={{ borderTop: "1.5px solid #b0b8c1", marginBottom: "10px" }}
            ></div>
            <div style={{ marginBottom: "8px" }}>
              <strong>2024 - GWFSS: Wheat Semantic Segmentation Dataset</strong>
              <div>
                Open-source dataset for semantic segmentation of wheat imagery.
              </div>
              <div style={{ color: "#2b4a6f", fontSize: "0.97em" }}>
                https://www.global-wheat.com/gwfss.html
              </div>
            </div>
            <div>
              <strong>
                2024 - Predicting Sunflower Head Moisture Content Using
                Self-Supervised Intermediate Representations
              </strong>
              <div>
                Leveraging autoencoder-based intermediate features to estimate
                moisture content in sunflower heads from image data.
              </div>
              <div style={{ color: "#2b4a6f", fontSize: "0.97em" }}>
                https://helexproject.eu/fr/le-projet-helex/
              </div>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
