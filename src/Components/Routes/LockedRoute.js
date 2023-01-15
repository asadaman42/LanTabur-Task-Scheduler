import { Box, Container } from '@mui/material';
import React, { useContext } from 'react';
import { Blocks } from 'react-loader-spinner';
import { useLocation } from 'react-router-dom';
import { UniversalContext } from '../../ContextSupplier/ContextSupplier';

const LockedRoute = ({ children }) => {
    const { user, loading } = useContext(UniversalContext);
    const location = useLocation();

    /* Spinner  */
    if (loading) {
        return (
            <Container sx={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
                <Box>
                    <Blocks
                        visible={true}
                        height="80"
                        width="80"
                        ariaLabel="blocks-loading"
                        wrapperStyle={{}}
                        wrapperClass="blocks-wrapper"
                    />
                </Box>
            </Container>
        )
    }
    if (user) {
        return children;
    }
    else {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }
};

export default LockedRoute;