
let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoid2lsbGlhbUBnbWFpbC5jb20iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOiJBZG1pbmlzdHJhdG9yIiwiVXNlcklkIjoiNCIsImV4cCI6MTczOTA1MTc2NiwiaXNzIjoiYXBpLnRhbGtpbmciLCJhdWQiOiJhcGkudGFsa2luZy51c2VycyJ9.iBGA7erHDA0FwqTZTTXqKouaGryxeoayEgxoK5JSwXA';


export const pagedUser = async (page, pageSize) => {
    try {
        const response = await fetch(`http://localhost:5296/api/User/paginado?page=${page}&pageSize=${pageSize}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null; // Para manejar errores sin romper el código
    }
}

export const getById = async (id) => {
        try {
            const response = await fetch(`http://localhost:5296/api/User/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
    
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
    
            return await response.json();
        } catch (error) {
            console.error('Error:', error);
            return null; // Para manejar errores sin romper el código
        }
};
