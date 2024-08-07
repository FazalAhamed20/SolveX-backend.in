
import { IDependencies } from "@/application/interfaces/IDependencies";
import { createSubscriptionController } from "./createSubscriptionController";
import { getAllSubscriptionController } from "./getAllSubscriptionController";
import { createPaymentController } from "./createPaymentController";
import { checkSubscriptionController } from "./checkSubscriptionController";

export const controller = (dependencies: IDependencies) => {
    return {
        createSubscription:createSubscriptionController(dependencies),
        getAllSubscription:getAllSubscriptionController(dependencies),
        createPayment:createPaymentController(dependencies),
        checkSubscription:checkSubscriptionController(dependencies)
 
    };
  };