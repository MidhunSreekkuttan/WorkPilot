import localforage from "localforage";

// Add New Data
export const addItemToDB = async (newItem, key) => {
    try {
        const currentData = await localforage.getItem(key) || [];
        // Push the new item to the front (or back) of the array
        const updatedArray = [newItem, ...currentData];
        await localforage.setItem(key, updatedArray);
    } catch (error) {
        console.error("Failed to add to IndexedDB:", error);
    }
};

// Update Data
export const updateItemInDB = async (updatedData, key) => {
    try {
        const currentData = await localforage.getItem(key) || [];
        const updatedArray = currentData.map(item =>
            item.id === updatedData.id ? updatedData : item
        );
        await localforage.setItem(key, updatedArray);
    } catch (error) {
        console.error("Failed to update IndexedDB:", error);
    }
};

// Delete Data
export const deleteItemFromDB = async (dataId, key) => {
    try {
        const currentData = await localforage.getItem(key) || [];
        const filteredArray = currentData.filter(item => item.id !== dataId);
        await localforage.setItem(key, filteredArray);
    } catch (error) {
        console.error("Failed to delete from IndexedDB:", error);
    }
};

// Delete an entire key
export const clearCacheKey = async (key) => {
    try {
        await localforage.removeItem(key);
    } catch (error) {
        console.error("Failed to remove key:", error);
    }
};

// Clear the Entire Database
export const clearEntireDB = async () => {
    try {
        await localforage.clear();
        console.log("IndexedDB cleared successfully");
    } catch (error) {
        console.error("Failed to clear database:", error);
    }
};