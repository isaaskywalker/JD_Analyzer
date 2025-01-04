import { TECH_STACK_KEYWORDS, JD_SECTIONS } from '../constants/keywords';

export const extractKeywords = (jdText) => {
  const keywords = TECH_STACK_KEYWORDS.filter((keyword) => jdText.includes(keyword));
  return {
    [JD_SECTIONS.REQUIRED_SKILLS]: keywords
  };
};
