// src/data/cv.ts
import yaml from "yaml";
import cvRaw from "./cv.yaml?raw";

export interface Skill {
  code: string[];
  projet: string[];
}

export interface Experience {
  company: string;
  position: string;
  location: string;
  duration: string;
  icon: string;
  isFormation: boolean;
  description: string;
  bullets?: string[];
}

export interface Publication {
  title: string;
  year: number;
  description: string;
  url: string;
}

export interface CVData {
  name: string;
  title: string;
  summary: string;
  mail: string;
  location: string;
  github: string;
  linkedin: string;
  linkedinLabel?: string;
  phone: string;
  skills: Skill;
  experiences: Experience[];
  hobbies: string[];
  publications: Publication[];
}

export interface CVDataStructure {
  fr: CVData;
  en: CVData;
}

export const cvData = yaml.parse(cvRaw) as CVDataStructure;
