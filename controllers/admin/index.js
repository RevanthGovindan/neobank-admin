import AdminLogin from './AdminLogin';
import Addcustomer from './Addcustomer';
import EditCustomer from './Editcustomer';
import DeleteCustomer from './Deletecustomer';
import GetCustomers from './Getcustomers';
import GetCustomerDetails from './GetCustomerDetails';
import Logout from './Logout';

const Admin = {
    adminLogin(request, response) {
        const login = new AdminLogin(request, response);
        login.adminLogin();
    },
    adminLogout(request, response) {
        const logout = new Logout(request, response);
        logout.doProcess();
    },
    addCustomer(request, response) {
        const addCustomer = new Addcustomer(request, response);
        addCustomer.doProcess();
    },
    editCustomer(request, response) {
        const editCustomer = new EditCustomer(request, response);
        editCustomer.doProcess();
    },
    getCustomers(request, response) {
        const getCust = new GetCustomers(request, response);
        getCust.doProcess();
    },
    getCustomerDetail(request, response) {
        const getCustDetail = new GetCustomerDetails(request, response);
        getCustDetail.doProcess();
    },
    deleteCustomer(request, response) {
        const deleteCustomer = new DeleteCustomer(request, response);
        deleteCustomer.doProcess();
    }
};

export default Admin;