/**
 * Immutable remove index from array (splice do it mutable)
 * @param {Array} array - array from which you want to delete an item
 * @param {number} index - index for delete
 * @return {Array} new array without elem, which was removed
 */
export const removeIndexFromArray = (array, index) => {

  if (typeof index !== 'number' || index < 0) return array;

  return array.slice(0, index).concat(array.slice(index + 1));

};

/**
 * helper for webpack context require
 */
export const requireAll = requireContext => requireContext.keys().map(requireContext);
