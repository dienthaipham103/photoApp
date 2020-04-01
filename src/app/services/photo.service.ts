import { Injectable } from '@angular/core';

import { Plugins, CameraResultType, Capacitor, FilesystemDirectory, 
        CameraPhoto, CameraSource } from '@capacitor/core';
import { range } from 'rxjs';

const { Camera, Filesystem, Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  // addition
  public photos: Photo[] = [];
  private PHOTO_STORAGE: string = "photos";
  
  test_photos = [
    {url: 'https://www.biography.com/.image/ar_1:1%2Cc_fill%2Ccs_srgb%2Cg_face%2Cq_auto:good%2Cw_300/MTY2MzU3OTcxMTUwODQxNTM1/steve-jobs--david-paul-morrisbloomberg-via-getty-images.jpg', 
    title: 'Local Photos'},
    {url: 'https://image.cnbcfm.com/api/v1/image/105778430-1551897565882microsoftfounderbillgatesspeaking.jpg?v=1571848897&w=740&h=416', 
    title: 'Results'}];

  constructor() { }

  // function to take photo
  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri, 
      source: CameraSource.Camera, 
      quality: 100
    });

     // Save the picture and add it to photo collection
    const savedImageFile = await this.savePicture(capturedPhoto);
    this.photos.unshift(savedImageFile);

    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos.map(p => {
              // Don't save the base64 representation of the photo data, 
              // since it's already saved on the Filesystem
              const photoCopy = { ...p };
              delete photoCopy.base64;
    
              return photoCopy;
              }))
    });
  }

  private async readAsBase64(cameraPhoto: CameraPhoto) {
    // Fetch the photo, read as a blob, then convert to base64 format
    const response = await fetch(cameraPhoto.webPath!);
    const blob = await response.blob();
  
    return await this.convertBlobToBase64(blob) as string;  
  }

  convertBlobToBase64 = (blob: Blob) => new Promise((resolve, reject) => {
    const reader = new FileReader;
    reader.onerror = reject;
    reader.onload = () => {
        resolve(reader.result);
    };
    reader.readAsDataURL(blob);
  });

  private async savePicture(cameraPhoto: CameraPhoto) {
    // Convert photo to base64 format, required by Filesystem API to save
    const base64Data = await this.readAsBase64(cameraPhoto);
  
    // Write the file to the data directory
    const fileName = new Date().getTime() + '.jpeg';
    await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: FilesystemDirectory.Data
    });
  
    // Get platform-specific photo filepaths
    return await this.getPhotoFile(cameraPhoto, fileName);
  }

  private async getPhotoFile(
    cameraPhoto: CameraPhoto, 
    fileName: string): 
    Promise<Photo> {
    
      return {filepath: fileName, 
              webviewPath: cameraPhoto.webPath };
            }
  
  public async loadSaved() {
    // Retrieve cached photo array data
    const photos = await Storage.get({ key: this.PHOTO_STORAGE });
    this.photos = JSON.parse(photos.value) || [];
    
    // Display the photo by reading into base64 format
    for (let photo of this.photos) {
      // Read each saved photo's data from the Filesystem
      const readFile = await Filesystem.readFile({
      path: photo.filepath,
      directory: FilesystemDirectory.Data
      });

      // Web platform only: Save the photo into the base64 field
      photo.base64 = `data:image/jpeg;base64,${readFile.data}`;
    }
  }

  public async remove(photoId){
    const {filepath, webviewPath} = this.photos[photoId];

    // delete the photo from File system
    await Filesystem.deleteFile({
      path: filepath,
      directory: FilesystemDirectory.Data
    });

    // delete in the thotos array
    this.photos.splice(photoId, 1);

    // re-set the Storage
    await Storage.clear();
    Storage.set({
      key: this.PHOTO_STORAGE,
      value: JSON.stringify(this.photos.map(p => {
              // Don't save the base64 representation of the photo data, 
              // since it's already saved on the Filesystem
              const photoCopy = { ...p };
              delete photoCopy.base64;
    
              return photoCopy;
              }))
    });
  }

  public async removeAll(){
    // delete the photo from File system
    for (let i = 0; i < this.photos.length; i++) {
      let {filepath, webviewPath} = this.photos[i];

      await Filesystem.deleteFile({
        path: filepath,
        directory: FilesystemDirectory.Data
      });
    }

    // delete in the thotos array
    this.photos = [];

    // re-set the Storage
    await Storage.clear();
  }
  
}

// addition
interface Photo {
  filepath: string;
  webviewPath: string;
  base64?: string;
}

