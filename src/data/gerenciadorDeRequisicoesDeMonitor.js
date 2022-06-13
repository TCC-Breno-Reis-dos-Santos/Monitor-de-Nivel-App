import axios from "axios";

export class GerenciadorDeRequisicoesDeMonitor {
  constructor(ip) {
    if (typeof ip != "string") throw new Error("IP deve ser uma String");
    this.service = axios.create({
      baseURL: "http://" + ip + "/",
      //timeout: 10000, // Timeout,
      // headers: {
      //   "Access-Control-Allow-Origin": "*",
      // }
    });
  }

  async pegaNivel() {
    return await this.service.get("level");
  }

  async pegaEstado() {
    return await this.service.get("state");
  }

  async pegaBombeando() {
    return await this.service.get("isPumping");
  }
}
