const globalData = {};

if (IS_RN) {
  global.globalData = {};
}

const setGlobalData = (key: string, val: any) => {
  (IS_RN ? global.globalData : globalData)[key] = val;
};

const getGlobalData = (key: string) => {
  return (IS_RN ? global.globalData : globalData)[key];
};

export { setGlobalData, getGlobalData };
