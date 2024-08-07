
import { IDependencies } from "@/application/interfaces/IDependencies";
import { createClanController } from "./createClanController";
import { fetchAllClanController } from "./fetchAllClansController";
import { fetchAllMemberController } from "./fetchAllMembersController";
import { fetchAllUsersController } from "./fetchAllUsersController";
import { addMemberController } from "./addMemberController";
import { deleteMemberController } from "./deleteMemberController";
import { blockClanController } from "./blockClanController";

export const controller = (dependencies: IDependencies) => {
    return {
        createClan:createClanController(dependencies),
        fetchAllClans:fetchAllClanController(dependencies),
        fetchAllMember:fetchAllMemberController(dependencies),
        fetchAllUsers:fetchAllUsersController(dependencies),
        addMember:addMemberController(dependencies),
        deleteMember:deleteMemberController(dependencies),
        blockClan:blockClanController(dependencies)
 
    };
  };