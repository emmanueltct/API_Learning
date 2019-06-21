import { Pool } from 'pg';
import   dotenv from  'dotenv'
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});
pool.on('connect', () =>{
  //console.log('connected to the db');
});
const createTables = () => {
const tables =
`CREATE TABLE IF NOT EXISTS
    users(
    id SERIAL PRIMARY KEY,
    email VARCHAR(128)  UNIQUE NOT NULL,
    first_name VARCHAR(128) NOT NULL,
    last_name VARCHAR(128) NOT NULL,
    password VARCHAR(128) NOT NULL,
    address VARCHAR(128) NOT NULL,
    is_admin BOOLEAN  DEFAULT FALSE
    );
    CREATE TABLE IF NOT EXISTS
        cars(
        id SERIAL PRIMARY KEY,
        owner_id int NOT NULL,
        created_on DATE NOT NULL DEFAULT CURRENT_DATE,
        state VARCHAR(128) NOT NULL,
        status VARCHAR(128) NOT NULL DEFAULT 'available',
        price INT NOT NULL,
        manufacturer VARCHAR(128) NOT NULL,
        model VARCHAR(128) NOT NULL,
        body_type VARCHAR(128) NOT NULL,
        FOREIGN KEY ( owner_id ) REFERENCES users(id)ON DELETE CASCADE
        ON UPDATE CASCADE
        );
    
     CREATE TABLE IF NOT EXISTS
        orders(
        id SERIAL PRIMARY KEY,
        buyer int NOT NULL,
        car_id int NOT NULL,
        amount INT NOT NULL,
        status VARCHAR(128) NOT NULL DEFAULT 'Pending',
        created_on DATE NOT NULL DEFAULT CURRENT_DATE,
        FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
        ON UPDATE CASCADE,
        FOREIGN KEY (buyer) REFERENCES users(id)ON DELETE CASCADE
        ON UPDATE CASCADE
        );

     CREATE TABLE IF NOT EXISTS
        flag(
        id SERIAL PRIMARY KEY,
        car_id INT NOT NULL,
        created_on DATE NOT NULL DEFAULT CURRENT_DATE,
        reason  VARCHAR(200) NOT NULL,
        description VARCHAR(128) NOT NULL,
        FOREIGN KEY (car_id) REFERENCES cars(id) ON DELETE CASCADE
        ON UPDATE CASCADE
        );
        INSERT INTO users (email,first_name,last_name,password,address,is_admin) values('andela@gmail.com','andela','bootcamp','12345','kigali','true') ON CONFLICT DO NOTHING;`
        pool.query(tables)
        .then((res)=>{
           
           //pool.end()
        })
        .catch((err)=>{
           
           pool.end()
        });
        
    };
    


 const dropTables=()=>{
  pool.query('DROP TABLE IF EXISTS users,cars,orders,flag  CASCADE');
  
  pool.end();
 }

export {createTables,dropTables}; 

require('make-runnable');






