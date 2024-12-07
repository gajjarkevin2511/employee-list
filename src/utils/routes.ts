export const baseUrl  = "api"
export const route = { 
    employee : {
        get : "/employees",
        post : "/employees",
        put : (id:string) => `/employees/${id}`,
        delete : (id:string) => `/employees/${id}`,
    }
} 