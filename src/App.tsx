import "./App.css";
import React from "react";
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

// Component for skill badge with icon
const SkillBadge = ({ skill }: { skill: string }) => {
  const [iconSrc, setIconSrc] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // Build CDN and local URLs
  const cdnUrl = `https://cdn.simpleicons.org/${skill
    .toLowerCase()
    .replace(/\s+/g, "")}`;
  const localUrl = `${import.meta.env.BASE_URL}icon/${skill.replace(
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

  return (
    <Badge variant="secondary" className="text-xs">
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
};

function App() {
  const { lang, toggleLanguage } = useLanguage();

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
    pageStyle: `
      @page { 
        size: A4; 
        margin: 0;
      }
      @media print {
        html, body {
          height: 100%;
          margin: 0 !important;
          padding: 0 !important;
        }
      }
    `,
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
              {data.skills.code.map((skill, index) => (
                <SkillBadge key={index} skill={skill} />
              ))}
            </div>
          </Card>
          <Card className="p-4 rounded-xl border gap-3">
            <Badge variant="secondary" className="text-xs font-semibold">
              Skills | Project
            </Badge>
            <div className="flex flex-row flex-wrap items-start content-start gap-1.5">
              {data.skills.projet.map((skill, index) => (
                <SkillBadge key={index} skill={skill} />
              ))}
            </div>
          </Card>
          {/* Interests */}
          <Card className="p-4 rounded-xl border gap-2 justify-between gap-1 content-between">
            <Badge className="flex gap-1 items-center" variant="secondary">
              <Sparkles /> {lang === "fr" ? "Centres d'intérêt" : "Hobbies"}
            </Badge>
            {data.hobbies.map((hobby, index) => {
              const hobbyIcons: { [key: string]: React.JSX.Element } = {
                "Voyage & exploration": <Plane size="16" />,
                "Travel & exploration": <Plane size="16" />,
                "E-sport": <Gamepad2 size="16" />,
                "E-sports": <Gamepad2 size="16" />,
                Musculation: <Dumbbell size="16" />,
                "Weight training": <Dumbbell size="16" />,
                Cuisine: <ChefHat size="16" />,
                Cooking: <ChefHat size="16" />,
                "Volley-ball": <Volleyball size="16" />,
                Volleyball: <Volleyball size="16" />,
              };
              return (
                <div key={index} className="flex gap-1 items-center">
                  {hobbyIcons[hobby] || <Sparkles size="16" />}
                  {hobby}
                </div>
              );
            })}
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
              {data.publications.map((pub, index) => (
                <div key={index}>
                  <strong>
                    {pub.year} - {pub.title}
                  </strong>
                  <p>{pub.description}</p>
                  <a
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-orange-600 hover:underline mt-1"
                  >
                    {lang === "fr" ? "Visiter le site" : "Visit website"}
                    <ExternalLink size="16" />
                  </a>
                </div>
              ))}
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
                .filter((exp) => !exp.isFormation)
                .map((exp, idx) => (
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
                        exp.bullets.map((bullet, bidx) => (
                          <li key={bidx}>{bullet}</li>
                        ))}
                    </ul>
                  </ExperienceCard>
                ))}
              {/* Formation/Education Split Line */}
              <div className="flex items-center gap-3 my-6">
                <GraduationCap size="36" className="text-green-500" />
                <span className="text-lg font-bold text-green-500">
                  {lang === "fr" ? "Formation" : "Education"}
                </span>
                <div className="flex-grow h-0.5 bg-gradient-to-r from-green-400 via-emerald-500 to-teal-600 rounded-full"></div>
              </div>
              {/* Formation/Education */}
              {data.experiences
                .filter((exp) => exp.isFormation)
                .map((exp, idx) => (
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
                        exp.bullets.map((bullet, bidx) => (
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
            padding: "15px 30px 10px 30px",
            fontFamily: "'Arial', 'Helvetica', sans-serif",
            color: "#1a1a1a",
            lineHeight: "1.35",
            fontSize: "10pt",
          }}
        >
          {/* Header - Professional and Compact */}
          <div
            style={{
              borderBottom: "2px solid #1a1a1a",
              paddingBottom: "10px",
              marginBottom: "15px",
            }}
          >
            <h1
              style={{
                fontSize: "24pt",
                fontWeight: "600",
                margin: "0",
                color: "#1a1a1a",
                letterSpacing: "0.5px",
              }}
            >
              {data.name.toUpperCase()}
            </h1>
            <div
              style={{
                fontSize: "12pt",
                color: "#333",
                fontWeight: "400",
                marginTop: "4px",
                marginBottom: "5px",
              }}
            >
              {data.title}
            </div>
            <div
              style={{
                fontSize: "9.5pt",
                color: "#555",
              }}
            >
              {data.location} • {data.mail} • {data.phone} • LinkedIn:{" "}
              {data.linkedin} • GitHub: {data.github}
            </div>
          </div>
          {/* Summary */}
          <div style={{ marginBottom: "10px" }}>
            <div
              style={{ fontSize: "9pt", color: "#333", textAlign: "justify" }}
            >
              {data.summary}
            </div>
          </div>

          {/* Professional Experience */}
          <div style={{ marginBottom: "10px" }}>
            <div
              style={{
                fontSize: "10.5pt",
                fontWeight: "700",
                color: "#1a1a1a",
                marginBottom: "5px",
                textTransform: "uppercase",
                letterSpacing: "0.3px",
                borderBottom: "1px solid #999",
                paddingBottom: "1px",
              }}
            >
              {lang === "fr"
                ? "Expérience Professionnelle"
                : "Professional Experience"}
            </div>
            {data.experiences
              .filter((exp) => !exp.isFormation)
              .map((exp, idx) => (
                <div key={idx} style={{ marginBottom: "7px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "600",
                        fontSize: "10pt",
                        color: "#1a1a1a",
                      }}
                    >
                      {exp.position} • {exp.company} • {exp.location}
                    </div>
                    <div
                      style={{
                        fontSize: "9.5pt",
                        color: "#666",
                        fontStyle: "italic",
                      }}
                    >
                      {exp.duration}
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: "9pt",
                      color: "#333",
                      marginBottom: "2px",
                    }}
                  >
                    {exp.description}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul style={{ margin: "2px 0 0 18px", padding: 0 }}>
                      {exp.bullets.map((bullet, bidx) => (
                        <li
                          key={bidx}
                          style={{
                            fontSize: "8.5pt",
                            color: "#444",
                            marginBottom: "0.5px",
                            lineHeight: "1.3",
                          }}
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

            {/* Education Section */}
            <div
              style={{
                fontSize: "11pt",
                fontWeight: "700",
                color: "#1a1a1a",
                marginBottom: "5px",
                marginTop: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.3px",
                borderBottom: "1px solid #999",
                paddingBottom: "1px",
              }}
            >
              {lang === "fr" ? "Formation" : "Education"}
            </div>
            {data.experiences
              .filter((exp) => exp.isFormation)
              .map((exp, idx) => (
                <div key={idx} style={{ marginBottom: "7px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                    }}
                  >
                    <div
                      style={{
                        fontWeight: "600",
                        fontSize: "10pt",
                        color: "#1a1a1a",
                      }}
                    >
                      {exp.position} • {exp.company}
                    </div>
                    <div
                      style={{
                        fontSize: "9.5pt",
                        color: "#666",
                        fontStyle: "italic",
                      }}
                    >
                      {exp.duration}
                    </div>
                  </div>
                  <div style={{ fontSize: "9pt", color: "#333" }}>
                    {exp.location} - {exp.description}
                  </div>
                  {exp.bullets && exp.bullets.length > 0 && (
                    <ul style={{ margin: "2px 0 0 15px", padding: 0 }}>
                      {exp.bullets.map((bullet, bidx) => (
                        <li
                          key={bidx}
                          style={{
                            fontSize: "8.5pt",
                            color: "#444",
                            lineHeight: "1.25",
                          }}
                        >
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
          </div>
          {/* Skills & Hobbies */}
          <div style={{ marginBottom: "12px" }}>
            <div
              style={{
                fontSize: "10pt",
                fontWeight: "700",
                color: "#1a1a1a",
                marginBottom: "4px",
                marginTop: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.3px",
                borderBottom: "1px solid #999",
                paddingBottom: "1px",
              }}
            >
              {lang === "fr" ? "Compétences" : "Skills"}
            </div>
            <div style={{ marginBottom: "3px" }}>
              <span
                style={{ fontWeight: "600", fontSize: "9.5pt", color: "#333" }}
              >
                {lang === "fr" ? "Technologies:" : "Technologies:"}
              </span>{" "}
              <span style={{ fontSize: "9.5pt", color: "#555" }}>
                {data.skills.code.join(", ")}
              </span>
            </div>
            <div style={{ marginBottom: "3px" }}>
              <span
                style={{ fontWeight: "600", fontSize: "9.5pt", color: "#333" }}
              >
                {lang === "fr" ? "Outils:" : "Tools:"}
              </span>{" "}
              <span style={{ fontSize: "9.5pt", color: "#555" }}>
                {data.skills.projet.join(", ")}
              </span>
            </div>
            <div>
              <span
                style={{ fontWeight: "600", fontSize: "9.5pt", color: "#333" }}
              >
                {lang === "fr" ? "Intérêts:" : "Interests:"}
              </span>{" "}
              <span style={{ fontSize: "9.5pt", color: "#555" }}>
                {data.hobbies.join(", ")}
              </span>
            </div>
          </div>
          {/* Publications */}
          <div style={{ marginBottom: "0" }}>
            <div
              style={{
                fontSize: "10pt",
                fontWeight: "700",
                color: "#1a1a1a",
                marginBottom: "4px",
                marginTop: "10px",
                textTransform: "uppercase",
                letterSpacing: "0.3px",
                borderBottom: "1px solid #999",
                paddingBottom: "1px",
              }}
            >
              Publications
            </div>
            {data.publications.map((pub, index) => (
              <div
                key={index}
                style={{
                  marginBottom:
                    index === data.publications.length - 1 ? "0" : "5px",
                }}
              >
                <div
                  style={{
                    fontWeight: "600",
                    fontSize: "9.5pt",
                    color: "#1a1a1a",
                  }}
                >
                  {pub.title} ({pub.year})
                </div>
                <div style={{ fontSize: "9pt", color: "#555" }}>
                  {pub.description}
                </div>
                <div
                  style={{
                    fontSize: "9.5pt",
                    color: "#666",
                    fontStyle: "italic",
                  }}
                >
                  {pub.url}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
