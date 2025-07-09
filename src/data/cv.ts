// src/data/cv.ts
import yaml from 'yaml'
import cvRaw from './cv.yaml?raw'

export const cvData = yaml.parse(cvRaw) as {
  fr: any
  en: any
}