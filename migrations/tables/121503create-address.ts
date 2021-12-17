import { address } from '../../models/address';

const create_table_address = async() => {
    await address.sync({force : true})
    .then(() => {
        console.log("Success Create address Table");
    })
    .catch((err) => {
        console.log("Error in Create address Table : ", err);
    })
}

create_table_address();