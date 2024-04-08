import React, {useEffect, useState} from "react";
import {getStorages} from "../../api/storage";
const useStorage = () => {
  const [storageData, setStorageData] = useState([]);

  useEffect(() => {
    setStorage();
  }, []);

  const setStorage = async () => {
    try {
      const data = await getStorages();
      setStorageData(data);
    } catch (error) {
      console.error("cannot fetch storage at the time", error);
    }
  };

  // storageData && console.log(`storageData :`, storageData);
  return {storageData};
};

export default useStorage;
