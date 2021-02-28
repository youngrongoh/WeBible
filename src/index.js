import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './app';
import AuthService from './service/auth_service';
import Database from './service/database';
import ImageUploader from './service/image_uploader';

const authService = new AuthService();
const database = new Database();
const imageUploader = new ImageUploader();

ReactDOM.render(
  <React.StrictMode>
    <App
      authService={authService}
      database={database}
      imageUploader={imageUploader}
    />
  </React.StrictMode>,
  document.getElementById('root')
);
