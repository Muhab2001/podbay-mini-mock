// type used to unify how third-party API SDKS return their results
// NOTEL can be improved further by using enum instead of raw HTTP status codes
export interface ThirdPartyHttpAPIResponse<PayloadT> {
    status: number
    data: PayloadT
}

// unify all API endpoint responses in a single format
interface HttpResponse{
    message: string
    statusCode: number
    
}

export interface ListHttpResponse<Result> extends HttpResponse {
    data: Result[] | null | undefined
}
export interface RetrieveHttpResponse<Result> extends HttpResponse{
    data: Result | null | undefined
}

export interface ErrorHttpResponse extends HttpResponse{
    error: string
    details: {
        issues: string[],
        method: string,
        url: string
    }
}



