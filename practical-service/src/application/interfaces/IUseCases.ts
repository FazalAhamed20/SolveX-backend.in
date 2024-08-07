import {
    IFetchAllPracticeUseCase,
    IGetAllPracticeUseCase,
    IBlockPracticeUseCase
} from '@/enterprise/useCaseInterface'


export interface IUseCases{
    fetchAllPracticeUseCase:(dependencies)=>IFetchAllPracticeUseCase
    getAllPracticeUseCase:(dependencies)=>IGetAllPracticeUseCase
    blockPracticeUseCase:(dependencies)=>IBlockPracticeUseCase

    
}