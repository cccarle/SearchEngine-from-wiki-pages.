const { getAllWordsIDsInPages, wordToID } = require('../helpers/readData')
const { getAllPagesThatIncludeWord } = require('../helpers/helpers')

/* 
Returns pages that include the search word, with score and wordID.
Returns in an ascending order and onlu top 5
*/

const getResultsForSearchedWord = async word => {
  const allPages = await getAllWordsIDsInPages()

  let wordId = wordToID(word)
  let numberOfResults = await getAllPagesThatIncludeWord(wordId, allPages)
    .length
  let pagesThatIncludeWord = await getAllPagesThatIncludeWord(wordId, allPages)
    .sort((a, b) => parseFloat(b.score) - parseFloat(a.score))
    .slice(0, 5)

  return { pagesThatIncludeWord, wordId, numberOfResults }
}

module.exports = {
  getResultsForSearchedWord
}
