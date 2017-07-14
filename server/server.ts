import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as cors from 'cors';
import * as path from 'path';

// Server class
class Server {

  public app: express.Application;


  constructor() {
    this.app = express();
    this.config();
  }

  
  // application config
  public config() {

    // express middleware
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(logger('dev'));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());

    // cors
    this.app.use((req, res, next) => {
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header('Cache-Control', 'max-age=31536000');
      next();
    });

    const buildPath = express.static(path.join(__dirname))

    this.app.use(buildPath);

    this.app.get('/', (request, response) => {
      response.sendFile(__dirname, 'index.html');
    });
    
  }
}


// export
export default new Server().app;