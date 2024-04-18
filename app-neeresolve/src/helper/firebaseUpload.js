import firebase from "@react-native-firebase/app";
import "@react-native-firebase/storage";

export const firebaseUpload = async (fileName, userId, file) => {
  try {
    const storageRef = firebase.storage().ref()

    const fileRef = storageRef.child(`uploads/${userId}/${fileName}`);

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new Error("Error in converting file to Blob"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", file, true);
      xhr.send(null);
    });

    await fileRef.put(blob);

    const downloadURL = await fileRef.getDownloadURL();

    return downloadURL;
  } catch (error) {
    console.error("Error uploading file to Firebase Storage:", error);
    throw error;
  }
};
