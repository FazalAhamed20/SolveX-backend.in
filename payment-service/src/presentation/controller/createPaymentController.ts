import { IDependencies } from '@/application/interfaces/IDependencies';
import { Request, Response, NextFunction } from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
dotenv.config();

const stripe = new Stripe(String(process.env.STRIPE_API_KEY).trim());

export const createPaymentController = (dependencies:IDependencies) => {
  const {
    useCases: { createPaymentUseCase },
  } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('req', req.body);

      const { payment_method_id, amount ,subscriptionId,interval,userId } = req.body;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: Math.round(amount * 100),
        currency: 'usd',
        payment_method: payment_method_id,
        confirm: true,
         automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never'
        },
      });
      if (paymentIntent.status === 'succeeded') {
        console.log("g");
        
        const result = await createPaymentUseCase(dependencies).execute(amount, interval, subscriptionId, payment_method_id,userId);
        res.send({ success: !!result });
      } else {
        res.status(400).send({ success: false });
      }

   
    } catch (error) {
      next(error);
    }
  };
};
