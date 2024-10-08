export const PARTS_OF_SPEECH = [
  'unknown',
  'verb',
  'adjective',
  'noun',
  'pronoun',
  'adverb',
  'preposition',
  'conjunction',
  'interjection'
] as const;

export const EXTENDED_PARTS_OF_SPEECH = [
  ...PARTS_OF_SPEECH,
  'phrasal verb',
  'slang',
  'expression',
  'proverb',
  'article',
  'determiner',
  'numeral'
] as const;
