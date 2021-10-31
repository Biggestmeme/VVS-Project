export class Server {
    private static instance: Server;
    private static PORT_APP : number;
    private static state : number;
    private static users : Set<String>;

    private constructor() {
        Server.PORT_APP = 64501;
        Server.state = 0;
        Server.users = new Set<String>();
      
    }

     public static changeAppPort(port:number) {
         this.PORT_APP = port;
     }
     public static changeServervState(state:number) {
         this.state = state;
     }
     public static getServerState() : number {
         return this.state;
     }

     public static getPortApp() : number {
         return this.PORT_APP;
     }

     public static addUser(user:string) : void {
         this.users.add(user);
     }
     public static hasUser(user:string) : boolean {
        return this.users.has(user);
     }

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */

      /* istanbul ignore next */
    public static getInstance(): Server {
        if (!Server.instance) {
            Server.instance = new Server();
        }

        return Server.instance;
    }

}