const apiUrl = 'https://localhost:44350/Home';

export const insertProperty = async <TResponse>( data: any): Promise<TResponse> => {
 
    const response = await fetch(`${apiUrl}/insertProperty`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return await response.json() as TResponse;  
};

export const fetchProperties = async <TResponse>( data: any): Promise<TResponse> => {
 
    const response = await fetch(`${apiUrl}/fetchProperties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return await response.json() as TResponse;  
};

export const saveFavourites = async <TResponse>( data: any): Promise<TResponse> => {
 
    const response = await fetch(`${apiUrl}/saveFavourites`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return await response.json() as TResponse;  
};

export const fetchIsPropertyFavourited = async <TResponse>( data: any): Promise<TResponse> => {
 
    const response = await fetch(`${apiUrl}/fetchIsPropertyFavourited`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    return await response.json() as TResponse;  
};