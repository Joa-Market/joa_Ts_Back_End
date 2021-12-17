import { Users } from '../../models/user';

const create_table_users = async() => {
    await Users.sync({force : true})
    .then(() => {
        console.log("Success Create users Table");
    })
    .catch((err) => {
        console.log("Error in Create users Table : ", err);
    })
}

create_table_users();