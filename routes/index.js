import express from 'express';
import Admin from '../controllers/admin';
import Banking from '../controllers/banking';

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

router.post('/api/admin/login', (req, res) => {
    Admin.adminLogin(req, res);
});

router.get('/api/admin/logout', (req, res) => {
    Admin.adminLogout(req, res);
});

router.post('/api/admin/addcustomer', (req, res) => {
    Admin.addCustomer(req, res);
});

router.put('/api/admin/editcustomer', (req, res) => {
    Admin.editCustomer(req, res);
});

router.get('/api/admin/getcustomers', (req, res) => {
    Admin.getCustomers(req, res);
});

router.get('/api/admin/getcustomerdetails/:customer_id', (req, res) => {
    Admin.getCustomerDetail(req, res);
});

router.delete('/api/admin/deletecustomer/:customer_id', (req, res) => {
    Admin.deleteCustomer(req, res);
});

router.post('/api/admin/addaccount', (req, res) => {
    Banking.addAccount(req, res);
});

router.put('/api/admin/updateaccount', (req, res) => {
    Banking.editAccount(req, res);
});

router.delete('/api/admin/deleteaccount/:account_id', (req, res) => {
    Banking.deleteAccount(req, res);
});

export default router;