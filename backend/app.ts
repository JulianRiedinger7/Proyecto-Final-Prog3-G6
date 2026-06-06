import { Servidor } from './core/server'

class App {
    public static run () {
        const servidor = new Servidor()
        servidor.startServer()
    }
}

App.run()

