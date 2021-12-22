import express from 'express';
import Http from './http';

export default class ExpressHttp implements Http {
  app: any;
  
  constructor() {
    this.app = express();
    this.app.use(express.json())
  }

  // /orders/${code} para /orders/:code
  convertUrl(url: string) {
    return url.replace(/\$\{/g, ":").replace(/\}/g, "");
  }

  async on(method: string, url: string, fn: any): Promise<void> {

    // fn é a função definida no arquivo RoutesConfig.js que a aplicação definiu como parte do seu domínio
    this.app[method](this.convertUrl(url), async function(req: any, res: any) {
      const data = await fn(req.params, req.body);
      res.json(data);
    });

  }
  
  async listen(port: number): Promise<void> {
    this.app.listen(port);
  }

}


