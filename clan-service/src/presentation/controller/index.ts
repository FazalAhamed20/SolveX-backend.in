
import { IDependencies } from "@/application/interfaces/IDependencies";
import { createClanController } from "./createClanController";

import { fetchAllMemberController } from "./fetchAllMembersController";
import { fetchAllUsersController } from "./fetchAllUsersController";
import { addMemberController } from "./addMemberController";
import { deleteMemberController } from "./deleteMemberController";
import { blockClanController } from "./blockClanController";
import { leaveClanController } from "./leaveClanController";
import { requestClanController } from "./requestClanController";
import { acceptClanController } from "./acceptClanController";
import { completeQuizController } from "./completeQuizController";
import { rejectClanController } from "./rejectClanController";
import { fetchAllClanController } from "./fetchAllClansController";

export const controller = (dependencies: IDependencies) => {
    return {
        createClan:createClanController(dependencies),
        fetchAllClans:fetchAllClanController(dependencies),
        fetchAllMember:fetchAllMemberController(dependencies),
        fetchAllUsers:fetchAllUsersController(dependencies),
        addMember:addMemberController(dependencies),
        deleteMember:deleteMemberController(dependencies),
        blockClan:blockClanController(dependencies),
        leaveClan:leaveClanController(dependencies),
        requestClan:requestClanController(dependencies),
        acceptClan:acceptClanController(dependencies),
        rejectClan:rejectClanController(dependencies),
        completeQuiz:completeQuizController(dependencies)
       
 
    };
  };