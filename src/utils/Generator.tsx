const authHeader = (token:string) => ({Authorization: `Bearer ${token}`});

export {authHeader};