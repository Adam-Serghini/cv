import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";

export const SkillBadge = ({ skill }: { skill: string }) => {
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
  useEffect(() => {
    setIconSrc(cdnUrl);
  }, [cdnUrl]);

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
