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

}