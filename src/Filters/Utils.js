export function isEqual(arr1, arr2) {
  if (!Array.isArray(arr1) || !Array.isArray(arr1)) {
    throw new Error("this function accepts only arrays");
  }
  if (arr1.length !== arr2.length) {
    return false;
  }
  if (JSON.stringify(arr1.sort()) === JSON.stringify(arr2.sort())) {
    return true;
  }
  return false;
}

export const isObject = (item) => {
  return item && typeof item === "object" && !Array.isArray(item);
};

export const mergeThemes = (baseTheme, extention) => {
  if (!isObject(extention)) {
    console.warn("Cusom theme should be structured as an object");
    return baseTheme;
  }
  if (!isObject(baseTheme)) {
    throw new Error("Base theme should be an object");
  }
  let combined = {};
  for (const key in baseTheme) {
    if (!extention.hasOwnProperty(key)) {
      combined[key] = baseTheme[key];
      continue;
    }
    if (!isObject(baseTheme[key]) || !isObject(extention[key])) {
      combined[key] = extention[key];
      continue;
    }
    if (isObject(baseTheme[key]) && isObject(extention[key])) {
      combined[key] = mergeThemes(baseTheme[key], extention[key]);
    }
  }
  return combined;
};

export const getOptionTitle = (filter, option, filtersOptions) => {
  const filterOptions = filtersOptions[filter] || [];
  let filterOption = filterOptions.find((item) => item.id === option);
  return filterOption?.title || "-";
};
