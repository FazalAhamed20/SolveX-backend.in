
import { IDependencies } from "@/application/interfaces/IDependencies";
import { createSubscriptionController } from "./createSubscriptionController";
import { getAllSubscriptionController } from "./getAllSubscriptionController";
import { createPaymentController } from "./createPaymentController";
import { checkSubscriptionController } from "./checkSubscriptionController";
import { blockSubscriptionController } from "./blockSubscriptionController";

export const controller = (dependencies: IDependencies) => {
    return {
        createSubscription:createSubscriptionController(dependencies),
        getAllSubscription:getAllSubscriptionController(dependencies),
        createPayment:createPaymentController(dependencies),
        checkSubscription:checkSubscriptionController(dependencies),
        blockSubscription:blockSubscriptionController(dependencies)
 
    };
  };