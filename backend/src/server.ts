require('dotenv').config();
import App from './app';


App.listen(process.env.PORT || 3333);