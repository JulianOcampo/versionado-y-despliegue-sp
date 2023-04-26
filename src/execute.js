const { Client } = require('pg')
const fs = require('fs');
const argv = require('minimist')(process.argv.slice(2));
const execute = async () => {
    if (!argv.sp) {
        console.error('Es necesario especificar el sp a ejecutar. Ej: node .\src\execute.js --sp nombre-sp')
        return
    }
    const client = new Client({
        host: 'localhost',
        port: 5432,
        database: 'postgres',
        user: 'postgres',
        password: 'postgres',
    })
    client
        .connect()
        .then(() => console.log('connected'))
        .catch((err) => console.error('connection error', err.stack))
    try {
        const data = fs.readFileSync(`src/store-procedures/${argv.sp}`, 'utf8');
        console.log(data);
        const res = await client.query(data)
        if (res.command == 'CREATE') {
            console.log(`${argv.sp}, ejecutado exitosamente!`)
        } else {
            console.error('Hubo un error, verifique consola!')
        }
        await client.end()
    } catch (err) {
        console.error(err)
        await client.end()
        return
    }
}
execute()