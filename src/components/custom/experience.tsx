import { Card, CardContent } from "@/components/ui/card";

import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ExperienceProps {
  company: string;
  position: string;
  location: string;
  duration: string;
  icon: string;
  children?: React.ReactNode;
}

export function ExperienceCard({
  company,
  position,
  location,
  duration,
  icon,
  children,
}: ExperienceProps) {
  return (
    <Card className="p-4 gap-2 border-0">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-2">
        <div>
          <div className="flex items-center gap-2">
            <img width="16px" src={`/icon/${icon}`} />
            <h3 className="text-xl font-bold ">{company}</h3>
            <p className="flex items-center gap-2 text-neutral-500">
              {position}
            </p>
          </div>
          <p className="flex items-center gap-2 text-neutral-500">
            <MapPin size="16" /> {location}
          </p>
        </div>{" "}
        <div className="flex flex-col sm:flex-row gap-2">
          <Badge variant="secondary">{duration}</Badge>
        </div>
      </div>
      <CardContent className="text-left">{children}</CardContent>
    </Card>
  );
}
