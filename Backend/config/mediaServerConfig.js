import { v2 as MediaServer } from 'cloudinary';


const connectMedia = () => {
  MediaServer.config({ 
    cloud_name: 'dbjaxxkkf', 
    api_key: '164939314185815', 
    api_secret: 'tOiQWRLWkrI3pVhxCPDKGXSOFXI'
  });

  console.log("Media Connected Successfully");
};

export default connectMedia;
