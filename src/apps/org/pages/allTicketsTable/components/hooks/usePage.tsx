import React, { useState } from 'react';


export function usePage(){
    const [rowsPerPage, setRowsPerPage] = useState<number>(25);
    const [page, setPage] = useState<number>(0);

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
      };
    
      const handleChangePage = (
        _event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
      ) => {
        setPage(newPage);
      };

    return {
        page,
        rowsPerPage,
        handleChangeRowsPerPage,
        handleChangePage
    }
}