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
  type strapiData = {
    data: {
      results: [arnopClient];
      pagination: {
        page: number;
        pageSize: number;
        pageCount: number;
        total: number;
      };
    };
  };

  type arnopClient = {
    id: number;
    code: string;
    dni: string;
    name: string;
    address: string;
    wifi_ssid: string;
    wifi_password: string;
    newModel: number;
    active: boolean;
    phone: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    ipmodel: any;
    email: any;
    indebt: boolean;
    billingmonth: any;
    billingyear: any;
    balance: any;
    stratum: any;
    city: City;
    plan: Plan;
    addresses: Address[];
    neighborhood: Neighborhood;
    technology: Technology;
    clienttype: ClientType;
    vlan: any;
    offer: Offer;
    offermovements: any[];
    debtmovements: any[];
    monthlybills: any[];
    tvspec: any;
  };
  type Neighborhood = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  
  type Address = {
    id: number;
    address: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    neighborhood: Neighborhood;
  };
  
  type City = {
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
  };
  
  type Plan = {
    id: number;
    name: string;
    mikrotik_name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    mikrotik_bandwidth: string;
  };
  
  type Technology = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
  
  type ClientType = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    icon: string;
  };
  
  type Offer = {
    id: number;
    name: string;
    price: number;
    currency: string;
    createdAt: string | null;
    updatedAt: string;
    publishedAt: string;
    affiliation_price: number;
    plan: Plan;
  };
  

}