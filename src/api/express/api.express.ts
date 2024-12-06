import { METHODS } from "http";
import { Api } from "../api";
import express, { Express, Request, Response } from "express";

export class ApiExpress implements Api {
  private constructor(readonly app: Express) {}

  static build() {
    const app = express();
    app.use(express.json());
    return new ApiExpress(app);
  }

  addGetRoute(
    path: string,
    handler: (req: Request, res: Response) => void
  ): void {
    this.app.get(path, handler);
  }

  addPostRoute(
    path: string,
    handle: (req: Request, res: Response) => Promise<void>
  ): void {
    this.app.post(path, handle);
  }

  start(port: number) {
    this.app.listen(port, () => {
      console.log("Server running on port " + port);
      this.printRoutes();
    });
  }

  private printRoutes() {
    const routes = this.app._router.stack
      .filter((route: any) => route.route)
      .map((route: any) => {
        return {
          path: route.route.path,
          method: route.route.stack[0].method,
        };
      });
  }
}
