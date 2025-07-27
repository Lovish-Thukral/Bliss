 import * as ImagePicker from 'expo-image-picker';
 
 const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access media library is required!');
      return false;
    }
    return true;
  };

  const pickImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [4, 5],
      quality: 1,
      selectionLimit: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      const asset = result.assets[0];
      let fileExtension = 'jpg';
      
      if (asset.fileName) {
        const fileNameParts = asset.fileName.split('.');
        if (fileNameParts.length > 1) {
          fileExtension = fileNameParts.pop().toLowerCase();
        }
      } else {
        const uriParts = asset.uri.split('.');
        if (uriParts.length > 1) {
          fileExtension = uriParts.pop().toLowerCase();
        }
      }

      let mimeType = 'image/jpeg';
      if (fileExtension === 'png') {
        mimeType = 'image/png';
      } else if (fileExtension === 'gif') {
        mimeType = 'image/gif';
      } else if (fileExtension === 'webp') {
        mimeType = 'image/webp';
      }

      const name = `photo_${Date.now()}.${fileExtension}`;

       return {
        imageUri: asset.uri,
        name: name,
        type: mimeType
      }
   
    }
  };


  export default pickImage;