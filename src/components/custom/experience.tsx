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
    <Card className="p-4 gap-3 border-0 hover:shadow-md transition-shadow duration-200">
      <div className="flex flex-col sm:flex-row justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <img
              width="20px"
              src={`${import.meta.env.BASE_URL}icon/${icon}`}
              alt={`${company} logo`}
              className="rounded-sm"
            />
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-gray-100">
              {company}
            </h3>
          </div>
          <p className="text-sm sm:text-base font-medium text-gray-700 dark:text-gray-300 italic">
            {position}
          </p>
        </div>
        <div className="flex flex-col items-end gap-1 min-w-[120px] text-right">
          <Badge variant="secondary" className="text-xs whitespace-nowrap mb-1">
            {duration}
          </Badge>
          <p className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 justify-end">
            <MapPin size="14" /> {location}
          </p>
        </div>
      </div>
      <CardContent className="text-left px-0">{children}</CardContent>
    </Card>
  );
}
