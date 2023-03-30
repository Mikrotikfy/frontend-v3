export { };

declare global {

  type StrapiAuth = {
    jwt: string;
    user: {
      id: number;
      username: string;
      email: string;
      provider: string;
      confirmed: boolean;
      blocked: boolean;
      role: {
        id: number;
        name: string;
        description: string;
        type: string;
      };
    };
  }
  
  type arnopUser = {
    id: number;
    username: string;
    email: string;
    provider: string;
    confirmed: boolean;
    blocked: boolean;
    createdAt: string;
    updatedAt: string;
    telegramchatid: string;
    phone: string;
    role: {
      id: number;
      name: string;
      description: string;
      type: string;
      createdAt: string;
      updatedAt: string;
    };
    cities: {
      id: number;
      name: string;
      color: string;
      active: string;
      count: string;
      countActive: string;
      countDisable: string;
      countRetired: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      mikrotiks: {
        id: number;
        name: string;
        ip: string;
        uptime: string;
        cpu: string;
        memory: string;
        version: string;
        buildtime: string;
        factorysoftware: string;
        totalmemory: string;
        cpucount: string;
        cpufrequency: string;
        freehddspace: string;
        totalhddspace: string;
        architecturename: string;
        platform: string;
        boardname: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
      }[];
    }[];
    clienttypes: {
      id: number;
      name: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      icon: string;
    }[];
    menus: {
      id: number;
      name: string;
      icon: string;
      url: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      priority: number;
      alert: boolean | null;
    }[];
  }

  type arnopService = {
    createdAt: string,
    icon: string,
    id: number,
    name: string,
    publishedAt: string,
    updatedAt: string,
  }

  type arnopCity = {
    active: string,
    color: string,
    count: string,
    countActive: string,
    countDisable: string,
    countRetired: string,
    createdAt: string,
    id: number,
  }

}