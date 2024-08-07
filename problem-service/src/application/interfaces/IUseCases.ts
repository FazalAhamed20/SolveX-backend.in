import {
    IGetAllProblemsUseCase,
    IFetchAllProblemUseCase,
    IBlockProblemUseCase
} from '@/enterprise/useCaseInterface'


export interface IUseCases{
    getAllProblemsUseCase:(dependencies)=>IGetAllProblemsUseCase
    fetchAllProblemUseCase:(dependencies)=>IFetchAllProblemUseCase
    blockProblemUseCase:(dependencies)=>IBlockProblemUseCase
}