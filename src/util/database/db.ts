import mysql from 'mysql2'

class DatabaseUtility {
    private queryFormat: any
    private config?: mysql.ConnectionConfig

    constructor(config?: mysql.ConnectionConfig) {
        this.queryFormat = (query: string, values: Array<string>) => {
            if (!values) return query
            return query.replace(/\:(\w+)/g, (txt, key) => {
                return values.hasOwnProperty(key) ? mysql.escape(values[key]) : txt
            })
        }
        this.config = config;
    }

    private connect(callback: (dbc: mysql.Connection) => Promise<any>): Promise<any> {
        return new Promise((resolve, reject) => {
            const dbc = this.config != undefined ? mysql.createConnection(this.config) : mysql.createConnection({
                host: process.env.MYSQL_HOST,
                port: process.env.MYSQL_PORT ? Number(process.env.MYSQL_PORT) : 3306,
                user: process.env.MYSQL_USER,
                password: process.env.MYSQL_PASSWORD,
                database: process.env.MYSQL_DATABASE,
                stringifyObjects: true,
                // debug:true
            })
            dbc.connect((error) => {
                if (error) {
                    reject(error)
                } else {
                    dbc.config.queryFormat = this.queryFormat
                    callback(dbc)
                        .then(result => resolve(result))
                        .catch(error => reject(error))
                        .finally(() => dbc.end())
                }
            })
        })
    }

    private sendQuery(dbc: mysql.Connection, query: string, option?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            dbc.query(query, option, (error, results) => {
                if (error) {
                    reject(new Error(`SQL error: ${query}`))
                } else {
                    resolve(results)
                }
            })
        })
    }

    private async sendQueries(dbc: mysql.Connection, queries: Array<{ query: string, option?: any }>) {
        for (var i = 0; i < queries.length; i++) {
            await this.sendQuery(dbc, queries[i].query, queries[i].option)
        }
    }

    query(query: string, option?: any): Promise<any> {
        return this.connect((dbc: mysql.Connection) => this.sendQuery(dbc, query, option))
    }

    queries(queries: Array<{ query: string, option?: any }>): Promise<any> {
        return this.connect((dbc: mysql.Connection) => this.sendQueries(dbc, queries))
    }
}

const db = new DatabaseUtility()

export default db
export { DatabaseUtility }
