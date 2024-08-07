import {
    ISubmitUseCase,
    IFetchSubmissionUseCase,
    IFetchSolvedUseCase,
    IPracticalSubmitUseCase,
    IFetchPracticalUseCase,
    IFetchSolvedPracticalUseCase,
    IFetchAllSubmissionUseCase
   
} from '@/enterprise/useCaseInterface'




export interface IUseCases{
    submitUseCase:(dependencies)=>ISubmitUseCase
    fetchSubmissionUseCase:(dependencies)=>IFetchSubmissionUseCase
    fetchSolvedUseCase:(dependencies)=>IFetchSolvedUseCase
    practicalSubmitUseCase:(dependencies)=>IPracticalSubmitUseCase
    fetchPracticalUseCase:(dependencies)=>IFetchPracticalUseCase
    fetchSolvedPracticalUseCase:(dependencies)=>IFetchSolvedPracticalUseCase
    fetchAllSubmissionUseCase:(dependencies)=>IFetchAllSubmissionUseCase
   
}