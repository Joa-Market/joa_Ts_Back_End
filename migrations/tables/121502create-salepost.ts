import { salepost } from '../../models/salepost';

const create_table_salepost = async() => {
    await salepost.sync({force : true})
    .then(() => {
        console.log("Success Create salepost Table");
    })
    .catch((err) => {
        console.log("Error in Create salepost Table : ", err);
    })
}

create_table_salepost();