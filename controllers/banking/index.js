import Addaccount from './Addaccount';
import Updateaccount from './Updateaccount';
import Deleteaccount from './Deleteaccount';

const Banking = {
    addAccount(request, response) {
        const add = new Addaccount(request,response);
        add.doProcess();
    },
    editAccount(request, response) {
        const edit = new Updateaccount(request,response);
        edit.doProcess();
    },
    deleteAccount(request, response) {
        const deleteAccount = new Deleteaccount(request,response);
        deleteAccount.doProcess();
    }
};

export default Banking;