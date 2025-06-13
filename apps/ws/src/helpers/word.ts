export const compareWords = (client_word: string, actual_word: string) => {
    if (client_word === actual_word) {
      return {
        message: `word_match`,
        word: actual_word
      };
    }
  
    const matches = [];
    const minLength = Math.min(client_word.length, actual_word.length);
  
    for (let i = 0; i < minLength; i++) {
      if (client_word[i] === actual_word[i]) {
        matches.push({ letter: client_word[i], index: i });
      }
    }
  
    if (matches.length > 0) {
      return {
        message: 'letter_match',
        matches
      };
    }
  
    return {
      message: 'no_match'
    };
  };
  