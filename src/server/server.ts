import * as express from 'express';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as handlebars from 'handlebars';
import * as logger from 'morgan';
import * as helmet from 'helmet';
import * as path from 'path';


// Server class
class Server {

  public app: express.Application;


  constructor() {
    this.app = express();
    this.config();
    this.routes();
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

    // this.app.set('view engine', 'html');
    // this.app.use('/', express.static(path.join(__dirname, 'bundle')));
    
  }

  // application routes
  public routes(): void {

    let router: express.Router;
    router = express.Router();

    this.app.use('/', router);
  }
}


// export
export default new Server().app;