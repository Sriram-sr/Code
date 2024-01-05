import { Router } from 'express';
import { customerValidationRules } from '../validation/customer-validators';
import { createCustomer } from '../controllers/customer-controllers';

const router = Router();

router.route('/create').post(customerValidationRules, createCustomer);

export default router;
